import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase border border-black/5 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
      aria-label={t('lang.toggleAria')}
      title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      <span className={language === 'vi' ? 'font-bold text-zinc-900 dark:text-white' : 'opacity-50'}>VI</span>
      <span className="opacity-30">/</span>
      <span className={language === 'en' ? 'font-bold text-zinc-900 dark:text-white' : 'opacity-50'}>EN</span>
    </button>
  );
};

export default LanguageSwitcher;
