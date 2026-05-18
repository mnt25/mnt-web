import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-transparent py-8 border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 dark:text-slate-500 text-sm">
          © {new Date().getFullYear()}{" "}
          <a
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('common.name')}
          </a>
          . {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
