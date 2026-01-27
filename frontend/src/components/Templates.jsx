import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// 🎨 CV TEMPLATE #1 - MODERN BEIGE
// ═══════════════════════════════════════════════════════════
export const CVTemplateModern = React.forwardRef(({ data, content }, ref) => (
  <div ref={ref} className="a4-container bg-[#fcfaf7] p-0 text-stone-800 font-sans">
    <div className="h-full flex flex-col">
      <div className="bg-[#e8dfd4] px-12 pt-12 pb-10">
        <div className="flex items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-white flex-shrink-0 flex items-center justify-center border-[6px] border-white shadow-xl overflow-hidden">
            <div className="text-5xl font-serif italic text-amber-800">
              {data.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-stone-900 mb-2 tracking-tight uppercase">
              {data.full_name}
            </h1>
            <p className="text-xl text-amber-700 font-medium mb-4 tracking-wide">
              {data.target_job}
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-stone-600 border-t border-stone-300/50 pt-4">
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-amber-600" />
                <span>{data.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-amber-600" />
                <span>{data.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-amber-600" />
                <span>{data.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-12 py-10 grid grid-cols-[1fr_1.5fr] gap-12">
        <div className="space-y-8">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-4 pb-1 border-b border-amber-200">À Propos</h2>
            <p className="text-[10px] leading-relaxed text-stone-600 text-justify italic">
              "{content.summary}"
            </p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-4 pb-1 border-b border-amber-200">Expertises</h2>
            <div className="flex flex-wrap gap-2">
              {content.skills?.map((skill, i) => (
                <span key={i} className="text-[9px] bg-white border border-stone-200 px-2 py-1 rounded text-stone-700">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-4 pb-1 border-b border-amber-200">Formation</h2>
            <div className="space-y-4">
              {content.education?.map((edu, i) => (
                <div key={i}>
                  <p className="text-[10px] font-bold text-stone-800 leading-tight">{edu.degree}</p>
                  <p className="text-[9px] text-stone-500 italic">{edu.school}</p>
                  <p className="text-[9px] text-amber-600 font-semibold">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-6 pb-1 border-b border-amber-200">Expériences</h2>
          <div className="space-y-8">
            {content.experience?.map((exp, i) => (
              <div key={i} className="relative pl-4">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-amber-200"></div>
                <div className="mb-1 flex justify-between items-baseline">
                  <h3 className="text-[12px] font-bold text-stone-900 uppercase tracking-tight">{exp.title}</h3>
                  <span className="text-[9px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{exp.dates}</span>
                </div>
                <p className="text-[10px] font-semibold text-stone-500 mb-3">{exp.company}</p>
                <ul className="space-y-1.5">
                  {exp.points?.map((point, j) => (
                    <li key={j} className="text-[10px] text-stone-600 leading-relaxed flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
));

// ═══════════════════════════════════════════════════════════
// 🎨 CV TEMPLATE #2 - CORPORATE BLUE (PHOTO RONDE)
// ═══════════════════════════════════════════════════════════
export const CVTemplateMinimal = React.forwardRef(({ data, content }, ref) => (
  <div ref={ref} className="a4-container flex bg-white text-slate-800">
    <div className="w-[7.5cm] bg-[#1a2e44] text-white p-8 flex flex-col">
      <div className="mb-10 text-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mx-auto mb-6 flex items-center justify-center shadow-2xl border-4 border-white/10">
          <span className="text-5xl font-bold">
             {data.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">{data.full_name}</h1>
        <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.2em]">{data.target_job}</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4 text-blue-200">Contact</h2>
          <div className="space-y-3 text-[9.5px] font-light">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center"><Mail size={12}/></div>
              <span className="break-all">{data.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center"><Phone size={12}/></div>
              <span>{data.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center"><MapPin size={12}/></div>
              <span>{data.address}</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4 text-blue-200">Compétences</h2>
          <div className="space-y-3">
            {content.skills?.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between text-[9px] mb-1">
                  <span>{skill}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>

    <div className="flex-1 p-12">
      <section className="mb-12">
        <h2 className="text-sm font-bold text-[#1a2e44] uppercase tracking-widest mb-4 flex items-center gap-3">
          <div className="w-8 h-[2px] bg-blue-600"></div> Profil
        </h2>
        <p className="text-[11px] leading-relaxed text-slate-600 text-justify">
          {content.summary}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-sm font-bold text-[#1a2e44] uppercase tracking-widest mb-6 flex items-center gap-3">
          <div className="w-8 h-[2px] bg-blue-600"></div> Expériences
        </h2>
        <div className="space-y-8">
          {content.experience?.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-900">{exp.title}</h3>
                  <p className="text-[11px] text-blue-600 font-semibold">{exp.company}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{exp.dates}</span>
              </div>
              <ul className="space-y-1.5 border-l border-slate-100 ml-1 pl-4">
                {exp.points?.map((point, j) => (
                  <li key={j} className="text-[10px] text-slate-600 leading-snug">• {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold text-[#1a2e44] uppercase tracking-widest mb-6 flex items-center gap-3">
          <div className="w-8 h-[2px] bg-blue-600"></div> Formation
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {content.education?.map((edu, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded-lg">
              <p className="text-[10px] font-bold text-slate-900 mb-1">{edu.degree}</p>
              <p className="text-[9px] text-slate-500">{edu.school}</p>
              <p className="text-[9px] text-blue-600 font-bold mt-1">{edu.year}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
));

// ═══════════════════════════════════════════════════════════
// 💌 LETTRE DE MOTIVATION - MODERN STRUCTURED (BLUE)
// ═══════════════════════════════════════════════════════════
export const LetterTemplateModern = React.forwardRef(({ data, content }, ref) => (
  <div ref={ref} className="a4-container bg-white flex text-slate-800 font-sans">
    <div className="w-1/3 bg-slate-50 border-r border-slate-200 p-12 flex flex-col">
      <div className="mb-12">
        <h1 className="text-2xl font-black text-slate-900 mb-2 leading-tight uppercase tracking-tighter">{data.full_name}</h1>
      </div>
      <div className="space-y-6 mt-auto">
        <div className="text-[10px] space-y-4">
          <section>
            <p className="font-bold text-slate-400 uppercase tracking-widest mb-2 text-[9px]">Contact</p>
            <p className="text-slate-600">{data.email}</p>
            <p className="text-slate-600">{data.phone}</p>
          </section>
          <section>
            <p className="font-bold text-slate-400 uppercase tracking-widest mb-2 text-[9px]">Adresse</p>
            <p className="text-slate-600">{data.address}</p>
          </section>
        </div>
      </div>
    </div>
    <div className="flex-1 p-16 flex flex-col">
      <div className="flex justify-between items-start mb-16">
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">Destinataire</p>
          <p className="text-lg font-bold text-slate-900 uppercase tracking-tight">{data.company_name}</p>
        </div>
        <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
          {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        </p>
      </div>
      <div className="mb-10">
        <h2 className="text-[11px] font-bold text-slate-900 uppercase border-b-2 border-blue-600 pb-2 inline-block tracking-widest">
          Candidature : {data.target_job}
        </h2>
      </div>
      <div className="text-[11px] leading-relaxed text-slate-600 text-justify space-y-4 whitespace-pre-line flex-1">
        {content.content}
      </div>
      <div className="pt-10 border-t border-slate-100 mt-10">
        <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">{data.full_name}</p>
      </div>
    </div>
  </div>
));