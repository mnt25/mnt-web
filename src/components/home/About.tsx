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
      className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300"
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
              <div className="absolute inset-0 bg-blue-500 rounded-2xl rotate-6 opacity-10 blur-sm"></div>
              <div className="relative bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl dark:shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
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
                      '{age} years old'
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    role:{" "}
                    <span className="text-green-600 dark:text-green-400">
                      'FrontEnd Intern'
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    passion: [
                    <span className="text-green-600 dark:text-green-400">
                      'Coding'
                    </span>
                    ,{" "}
                    <span className="text-green-600 dark:text-green-400">
                      'UI/UX'
                    </span>
                    ,{" "}
                    <span className="text-green-600 dark:text-green-400">
                      'Solving'
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
                <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-colors shadow-sm">
                  <Terminal className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <span className="text-slate-800 dark:text-white font-medium">
                    Clean Code
                  </span>
                </div>
              </Reveal>
              <Reveal width="100%">
                <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-colors shadow-sm">
                  <User className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <span className="text-slate-800 dark:text-white font-medium">
                    Teamwork
                  </span>
                </div>
              </Reveal>
              <Reveal width="100%">
                <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-colors shadow-sm">
                  <Coffee className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <span className="text-slate-800 dark:text-white font-medium">
                    Dedication
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
