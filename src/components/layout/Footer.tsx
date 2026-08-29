import React from "react";
import { Copyright } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-black/[0.06] dark:border-white/[0.08] bg-transparent py-8 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-center">
          <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400">
            <Copyright className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
            <span className="leading-none font-medium">{new Date().getFullYear()}</span>
            <span className="text-zinc-300 dark:text-zinc-700 leading-none">•</span>
            <span className="leading-none">
              Made by{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Pham Son
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
