import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-200"
            aria-label={t('lang.toggleAria')}
        >
            <Languages className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span className="w-6 inline-block text-center">{language === 'vi' ? 'VN' : 'EN'}</span>
        </button>
    );
};

export default LanguageSwitcher;
