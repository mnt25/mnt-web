import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center select-none relative">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] p-8 sm:p-10 rounded-3xl shadow-xl shadow-black/5 dark:shadow-black/40">
        <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10 flex items-center justify-center mx-auto mb-6 text-rose-500">
          <AlertCircle className="w-6 h-6" />
        </div>

        <span className="block font-mono text-xs text-cyan-600 dark:text-cyan-400 font-semibold uppercase mb-2">
          {t('notfound.errorCode')}
        </span>
        
        <h1 className="text-6xl font-bold tracking-tight text-zinc-950 dark:text-white mb-2">
          404
        </h1>

        <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
          {t('notfound.title')}
        </h2>

        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
          {t('notfound.diagnostics')}
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-full font-mono text-xs font-semibold transition-all duration-200 w-full"
        >
          <Home className="w-4 h-4" />
          <span>{t('notfound.returnBtn')}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
