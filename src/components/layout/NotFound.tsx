import React from "react";
import { Link } from "react-router-dom";
import { Home, Terminal, AlertTriangle, Cpu } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-transparent px-4 text-center select-none font-sans relative overflow-hidden">
      {/* Background grids and glowing auroras */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 dark:opacity-30 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/10 dark:bg-cyan-500/5 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Cyber Panel */}
      <div className="max-w-lg w-full bg-white/70 dark:bg-zinc-950/40 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/80 p-8 relative shadow-2xl dark:shadow-[0_0_50px_rgba(6,182,212,0.02)] rounded-none">
        {/* Futuristic layout brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-350 dark:border-zinc-700" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-350 dark:border-zinc-700" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-350 dark:border-zinc-700" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-350 dark:border-zinc-700" />

        {/* Warning Indicator */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-500/5 border border-red-500/20 text-red-500 rounded-none relative animate-pulse">
            <AlertTriangle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
        </div>

        {/* Glitch-like header */}
        <span className="block font-mono text-[10px] text-blue-500 dark:text-cyan-400 tracking-widest font-extrabold uppercase mb-2">
          {t('notfound.errorCode')}
        </span>
        
        <h1 className="text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-2 font-mono relative">
          404
        </h1>

        <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-200 font-mono tracking-wider uppercase mb-4">
          {t('notfound.title')}
        </h2>

        {/* Technical display message */}
        <div className="bg-slate-50 dark:bg-black/60 border border-slate-200/50 dark:border-zinc-900/60 p-4 mb-8 relative rounded-none text-left">
          <div className="absolute top-2.5 left-3.5 flex items-center gap-1.5 text-zinc-400 dark:text-zinc-600 font-mono text-[9px] pointer-events-none uppercase tracking-widest">
            <Terminal className="w-2.5 h-2.5" />
            <span>sys_diagnostics_stream</span>
          </div>
          <p className="font-mono text-xs text-slate-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line pt-5">
            {t('notfound.diagnostics')}
          </p>
        </div>

        {/* Return Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-slate-100 dark:bg-zinc-950 hover:bg-slate-200 dark:hover:bg-zinc-900 text-slate-800 dark:text-cyan-400 border border-slate-300 dark:border-cyan-500/20 hover:border-blue-500 dark:hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-none w-full"
        >
          <Home className="w-4 h-4 mr-2.5" />
          {t('notfound.returnBtn')}
        </Link>
      </div>

      {/* Decorative background bottom metrics */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[9px] text-slate-400 dark:text-zinc-600 pointer-events-none uppercase hidden sm:flex">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>PORT: 5173 // LOCALHOST</span>
        </div>
        <span>status: system_listening</span>
      </div>
    </div>
  );
};

export default NotFound;
