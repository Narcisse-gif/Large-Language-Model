import os, json, re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

def get_available_model():
    """Sélectionne le meilleur modèle Gemini disponible"""
    try:
        available_models = [
            m.name for m in genai.list_models() 
            if 'generateContent' in m.supported_generation_methods
        ]
        priority = [
            'models/gemini-1.5-flash',
            'models/gemini-1.5-pro',
            'models/gemini-pro'
        ]
        for target in priority:
            if target in available_models:
                return genai.GenerativeModel(target)
        return genai.GenerativeModel(available_models[0])
    except Exception as e:
        print(f"⚠️  Erreur sélection modèle: {e}")
        return genai.GenerativeModel('gemini-pro')

model = get_available_model()
app = FastAPI(title="CV & Letter Builder API", version="2.0")

# Configuration CORS optimisée
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CVRequest(BaseModel):
    full_name: str
    email: Optional[str] = ""
    phone: Optional[str] = ""
    address: Optional[str] = ""
    target_job: str
    experience: str
    education: Optional[str] = ""
    skills: Optional[str] = ""
    template_style: Optional[str] = "modern"  # modern, minimal, creative

class LetterRequest(BaseModel):
    full_name: str
    email: Optional[str] = ""
    phone: Optional[str] = ""
    address: Optional[str] = ""
    target_job: str
    company_name: str
    motivation: str
    background: Optional[str] = ""
    template_style: Optional[str] = "classic"  # classic, modern, bold

@app.get("/")
async def root():
    """Endpoint de santé"""
    return {
        "status": "🚀 API Active",
        "version": "2.0",
        "endpoints": ["/generate-cv", "/generate-letter"]
    }

@app.post("/generate-cv")
async def gen_cv(info: CVRequest):
    """Génère un CV professionnel optimisé IA"""
    prompt = f"""Tu es un Expert RH de niveau international. Crée un CV exceptionnel et impactant pour {info.full_name}.
    
    POSTE VISÉ: {info.target_job}
    
    RÈGLES STRICTES:
    - Utilisez des verbes d'action puissants (Dirigé, Optimisé, Développé, Piloté...)
    - Quantifiez les résultats (chiffres, pourcentages, impacts mesurables)
    - Soyez synthétique: le CV doit tenir sur 1 PAGE A4 maximum
    - Adaptez le ton au niveau du poste (junior: apprentissage, senior: leadership)
    - Mettez en avant les compétences transférables
    
    FORMAT JSON UNIQUEMENT (pas de markdown, pas de texte avant/après):
    {{
      "summary": "Résumé professionnel accrocheur de 2-3 lignes maximum qui positionne le candidat",
      "experience": [
        {{
          "title": "Profil",
          "company": "Nom de l'entreprise",
          "dates": "MM/AAAA - MM/AAAA",
          "points": [
            "Réalisation concrète avec impact mesurable",
            "Expertise technique ou métier démontrée",
            "Achievement quantifié si possible"
          ]
        }}
      ],
      "education": [
        {{
          "degree": "Diplôme obtenu",
          "school": "Établissement",
          "year": "Année"
        }}
      ],
      "skills": ["Compétence 1", "Compétence 2", "Compétence 3", "Compétence 4", "Compétence 5"]
    }}
    
    DONNÉES FOURNIES:
    - Expérience: {info.experience}
    - Formation: {info.education}
    - Compétences: {info.skills}
    
    IMPORTANT: Retourne UNIQUEMENT le JSON, rien d'autre.
    """
    
    try:
        response = model.generate_content(prompt)
        
        # Extraction du JSON depuis la réponse
        text = response.text.strip()
        
        # Retire les balises markdown si présentes
        text = re.sub(r'```json\s*', '', text)
        text = re.sub(r'```\s*$', '', text)
        
        # Extraction du JSON
        json_match = re.search(r'\{.*\}', text, re.DOTALL)
        if not json_match:
            raise ValueError("Pas de JSON trouvé dans la réponse")
        
        json_str = json_match.group(0)
        result = json.loads(json_str)
        
        # Validation basique
        if not all(key in result for key in ['summary', 'experience', 'education', 'skills']):
            raise ValueError("Structure JSON incomplète")
        
        return result
        
    except json.JSONDecodeError as e:
        print(f"❌ Erreur JSON: {e}")
        raise HTTPException(status_code=500, detail=f"Erreur de parsing JSON: {str(e)}")
    except Exception as e:
        print(f"❌ Erreur génération CV: {e}")
        raise HTTPException(status_code=500, detail=f"Erreur lors de la génération: {str(e)}")

@app.post("/generate-letter")
async def gen_letter(info: LetterRequest):
    """Génère une lettre de motivation percutante"""
    prompt = f"""Rédige une lettre de motivation EXCEPTIONNELLE et PERSONNALISÉE pour {info.full_name}.
    
    ENTREPRISE CIBLE: {info.company_name}
    POSTE: {info.target_job}
    
    STRUCTURE IMPÉRATIVE (méthode VOUS-MOI-NOUS):
    
    1. VOUS (l'entreprise) - 1 paragraphe:
       - Pourquoi cette entreprise en particulier?
       - Quelle valeur/mission/projet vous attire?
       - Montrez que vous connaissez l'entreprise
    
    2. MOI (le candidat) - 1-2 paragraphes:
       - Votre parcours pertinent: {info.background}
       - Vos compétences clés pour ce poste
       - Une réalisation concrète qui prouve votre valeur
    
    3. NOUS (la synergie) - 1 paragraphe:
       - Comment vous allez contribuer concrètement
       - La valeur ajoutée de votre profil
       - Motivation: {info.motivation}
    
    STYLE:
    - Ton professionnel mais humain et authentique
    - Évitez les clichés ("Je me permets de...", "Actuellement à la recherche...")
    - Soyez DIRECT et IMPACTANT dès la première phrase
    - Maximum 280 mots (1 page A4)
    - Évitez la langue de bois
    
    IMPORTANT: Retournez UNIQUEMENT le texte de la lettre, sans formule de politesse finale (elle sera ajoutée automatiquement).
    """
    
    try:
        response = model.generate_content(prompt)
        content = response.text.strip()
        
        # Nettoyage du contenu
        content = re.sub(r'^```.*\n', '', content)
        content = re.sub(r'\n```$', '', content)
        
        return {"content": content}
        
    except Exception as e:
        print(f"❌ Erreur génération lettre: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la génération de la lettre: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    print("🚀 Lancement du serveur API...")
    print("📍 URL: http://0.0.0.0:8001")
    print("📚 Docs: http://0.0.0.0:8001/docs")
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="info")