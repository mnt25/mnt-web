import React from "react";
import { User, Terminal, Coffee } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Reveal } from "../ui/Reveal";

const birthYear = 2003;
const age = new Date().getFullYear() - birthYear;

const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section
      id="about"
      className="py-20 bg-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t('about.title')}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image/Visual column */}
          <div className="relative">
            <Reveal width="100%">
              <div className="relative bg-slate-50/10 dark:bg-zinc-900/10 p-8 border border-slate-200/80 dark:border-zinc-800/80 backdrop-blur-sm relative overflow-visible">
                {/* Corner grid bracket marks */}
                <div className="absolute -top-px -left-px w-2 h-2 -translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
                <div className="absolute -top-px -right-px w-2 h-2 translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
                <div className="absolute -bottom-px -left-px w-2 h-2 -translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
                <div className="absolute -bottom-px -right-px w-2 h-2 translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 bg-red-500"></div>
                  <div className="w-3 h-3 bg-yellow-500"></div>
                  <div className="w-3 h-3 bg-green-500"></div>
                </div>
                <div className="font-mono text-sm text-slate-700 dark:text-slate-300 space-y-2">
                  <p>
                    <span className="text-purple-600 dark:text-purple-400">
                      const
                    </span>{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      developer
                    </span>{" "}
                    ={" "}
                    <span className="text-yellow-600 dark:text-yellow-300">{`{`}</span>
                  </p>
                  <p className="pl-4">
                    name:{" "}
                    <span className="text-green-600 dark:text-green-400">
                      '{t('common.name')}'
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    age:{" "}
                    <span className="text-green-600 dark:text-green-400">
                      '{age} {t('about.ageUnit')}'
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    role:{" "}
                    <span className="text-green-600 dark:text-green-400">
                      '{t('about.roleValue')}'
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    passion: [
                    <span className="text-green-600 dark:text-green-400">
                      '{t('about.passion.coding')}'
                    </span>
                    ,{" "}
                    <span className="text-green-600 dark:text-green-400">
                      '{t('about.passion.uiux')}'
                    </span>
                    ,{" "}
                    <span className="text-green-600 dark:text-green-400">
                      '{t('about.passion.solving')}'
                    </span>
                    ],
                  </p>
                  <p className="pl-4">
                    hardWorker:{" "}
                    <span className="text-red-600 dark:text-red-400">true</span>
                  </p>
                  <p className="text-yellow-600 dark:text-yellow-300">{`}`};</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Content column */}
          <div className="space-y-6">
            <Reveal>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {t('about.journeyTitle')}
              </h3>
            </Reveal>
            <Reveal>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('about.journeyDesc1')}
                <a
                  href="https://btec.fpt.edu.vn/ve-btec-fpt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 ml-1 no-underline"
                >
                  {t('about.journeyDesc1School')}
                </a>
                {t('about.journeyDesc1End')}
              </p>
            </Reveal>
            <Reveal>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('about.journeyDesc2')}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Reveal width="100%">
                <div className="flex flex-col items-center p-4 bg-slate-50/10 dark:bg-zinc-900/10 border border-slate-200/60 dark:border-zinc-800/60 hover:border-blue-500/50 transition-all duration-300 relative overflow-visible group hover:-translate-y-1">
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <Terminal className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <span className="text-slate-800 dark:text-white font-medium">
                    {t('about.value.cleanCode')}
                  </span>
                </div>
              </Reveal>
              <Reveal width="100%">
                <div className="flex flex-col items-center p-4 bg-slate-50/10 dark:bg-zinc-900/10 border border-slate-200/60 dark:border-zinc-800/60 hover:border-blue-500/50 transition-all duration-300 relative overflow-visible group hover:-translate-y-1">
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <User className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <span className="text-slate-800 dark:text-white font-medium">
                    {t('about.value.teamwork')}
                  </span>
                </div>
              </Reveal>
              <Reveal width="100%">
                <div className="flex flex-col items-center p-4 bg-slate-50/10 dark:bg-zinc-900/10 border border-slate-200/60 dark:border-zinc-800/60 hover:border-blue-500/50 transition-all duration-300 relative overflow-visible group hover:-translate-y-1">
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-300 dark:border-zinc-700 pointer-events-none" />
                  <Coffee className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <span className="text-slate-800 dark:text-white font-medium">
                    {t('about.value.dedication')}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
