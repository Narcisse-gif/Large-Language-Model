import React, { useState, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { 
  CVTemplateModern, 
  CVTemplateMinimal, 
  LetterTemplateModern
} from './components/Templates';
import { 
  FileText, 
  Mail, 
  ChevronLeft, 
  Download, 
  Send, 
  Loader2, 
  Sparkles,
  Palette,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

function App() {
  const [step, setStep] = useState('choice'); 
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern'); 
  const [data, setData] = useState({
    full_name: '', 
    email: '', 
    phone: '', 
    address: '', 
    target_job: '',
    experience: '', 
    education: '', 
    skills: '',
    company_name: '', 
    motivation: '', 
    background: ''
  });
  const [result, setResult] = useState(null);
  const printRef = useRef();

  const CV_TEMPLATES = [
    { 
      id: 'modern', 
      name: 'Modern Beige', 
      desc: 'Design premium avec sidebar élégante',
      component: CVTemplateModern,
      color: 'from-blue-500 to-purple-600'
    },
    { 
      id: 'minimal', 
      name: 'Corporate Blue', 
      desc: 'Minimaliste et sophistiqué (Photo ronde)',
      component: CVTemplateMinimal,
      color: 'from-slate-600 to-slate-800'
    }
  ];

  const LETTER_TEMPLATES = [
    { 
      id: 'modern', 
      name: 'Modern Structured', 
      desc: 'Design professionnel bleu',
      component: LetterTemplateModern,
      color: 'from-blue-600 to-slate-700'
    }
  ];

  const handleDownload = () => {
    const opt = { 
      margin: 0, 
      filename: `${step}_${data.full_name.replace(/\s/g, '_')}.pdf`, 
      html2canvas: { scale: 3, useCORS: true }, 
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    };
    html2pdf().set(opt).from(printRef.current).save();
  };

  const generate = async (endpoint) => {
    if (!data.full_name || !data.target_job) {
      alert("⚠️ Nom complet et Poste visé sont obligatoires");
      return;
    }
    if (step === 'letter' && !data.company_name) {
      alert("⚠️ Le nom de l'entreprise est obligatoire pour une lettre");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const payload = { ...data, template_style: selectedTemplate };
      const res = await axios.post(`https://large-language-model-zdmj.onrender.com/${endpoint}`, payload);
      setResult(res.data);
    } catch (err) {
      alert(`❌ Erreur serveur. Vérifiez le port 8001.`);
    } finally {
      
      setLoading(false);
    }
  };

  if (step === 'choice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="relative z-10 text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-yellow-400" size={40} />
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase">
              Builder <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI</span>
            </h1>
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8">
          <button onClick={() => { setStep('cv'); setSelectedTemplate('modern'); }} className="choice-card group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText size={40} className="text-white" />
            </div>
            <span className="text-2xl font-bold mb-2">Curriculum Vitae</span>
            <p className="text-slate-400 text-sm text-center">Modern • Corporate</p>
            <ArrowRight className="mt-4 text-blue-400" size={24} />
          </button>

          <button onClick={() => { setStep('letter'); setSelectedTemplate('modern'); }} className="choice-card group">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail size={40} className="text-white" />
            </div>
            <span className="text-2xl font-bold mb-2">Cover Letter</span>
            <p className="text-slate-400 text-sm text-center">Modern Structured</p>
            <ArrowRight className="mt-4 text-orange-400" size={24} />
          </button>
        </div>
      </div>
    );
  }

  const templates = step === 'cv' ? CV_TEMPLATES : LETTER_TEMPLATES;
  const CurrentTemplate = templates.find(t => t.id === selectedTemplate)?.component;

  return (
    <div className="h-screen flex flex-col bg-slate-100 font-sans">
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10">
        <button onClick={() => { setStep('choice'); setResult(null); }} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-all">
          <ChevronLeft size={20} /> Back
        </button>
        <div className="flex items-center gap-4">
          <span className="bg-slate-100 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest text-slate-600">
            {step === 'cv' ? '📄 CV Builder' : '💌 Letter Builder'}
          </span>
          {result && (
            <button onClick={handleDownload} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:shadow-xl transition-all">
              <Download size={18} /> Download PDF
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[480px] bg-white border-r flex flex-col">
          {/* Bloc de sélection de design affiché UNIQUEMENT pour le CV */}
          {step === 'cv' && (
            <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 border-b">
              <div className="flex items-center gap-2 mb-4">
                <Palette size={20} className="text-purple-600" />
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-700">Choose a design</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {templates.map(template => (
                  <button key={template.id} onClick={() => setSelectedTemplate(template.id)} className={`p-4 rounded-xl border-2 transition-all ${selectedTemplate === template.id ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-slate-200 bg-white'}`}>
                    <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${template.color} mb-3 flex items-center justify-center`}>
                      {selectedTemplate === template.id && <CheckCircle2 className="text-white" size={32} />}
                    </div>
                    <p className="text-[10px] font-black uppercase text-slate-700">{template.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <section className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact details</h3>
                <input placeholder="Full Name *" className="input-style font-semibold" value={data.full_name} onChange={e => setData({...data, full_name: e.target.value})} />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Email *" className="input-style" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                  <input placeholder="Phone" className="input-style" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
                </div>
                <input placeholder="City, Country" className="input-style" value={data.address} onChange={e => setData({...data, address: e.target.value})} />
              </section>

              <section className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Content</h3>
                <input placeholder="Profil" className="input-style font-bold text-blue-600" value={data.target_job} onChange={e => setData({...data, target_job: e.target.value})} />
                {step === 'cv' ? (
                  <>
                    <textarea placeholder="Experiences..." className="input-style h-44 resize-none" value={data.experience} onChange={e => setData({...data, experience: e.target.value})} />
                    <textarea placeholder="Training..." className="input-style h-28 resize-none" value={data.education} onChange={e => setData({...data, education: e.target.value})} />
                    <input placeholder="Skills (commas)" className="input-style" value={data.skills} onChange={e => setData({...data, skills: e.target.value})} />
                  </>
                ) : (
                  <>
                    <input placeholder="Company Name *" className="input-style font-semibold" value={data.company_name} onChange={e => setData({...data, company_name: e.target.value})} />
                    <textarea placeholder="Motivation..." className="input-style h-40 resize-none" value={data.motivation} onChange={e => setData({...data, motivation: e.target.value})} />
                    <textarea placeholder="Background..." className="input-style h-32 resize-none" value={data.background} onChange={e => setData({...data, background: e.target.value})} />
                  </>
                )}
              </section>

              <button onClick={() => generate(step === 'cv' ? 'generate-cv' : 'generate-letter')} disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-3">
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Build with AI</>}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-slate-200 overflow-y-auto p-12 flex flex-col items-center">
          {result && CurrentTemplate ? (
            <div className="shadow-2xl scale-[0.85] origin-top mb-20">
              <CurrentTemplate data={data} content={result} ref={printRef} />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <Sparkles size={48} className="opacity-30 mb-6" />
              <p className="text-lg font-semibold text-slate-500">No preview available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;