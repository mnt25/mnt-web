import React from "react";
import { FileCode2, Database, Terminal, Cpu } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Reveal } from "../ui/Reveal";



const Skills: React.FC = () => {
  const { t } = useLanguage();

  const skillCards = [
    {
      title: t('skills.html'),
      description: t('skills.htmlDesc'),
      icon: FileCode2,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "hover:border-orange-500/50",
      shadowColor: "hover:shadow-orange-500/20",
    },
    {
      title: t('skills.net'),
      description: t('skills.netDesc'),
      icon: Cpu,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "hover:border-purple-500/50",
      shadowColor: "hover:shadow-purple-500/20",
    },
    {
      title: t('skills.db'),
      description: t('skills.dbDesc'),
      icon: Database,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "hover:border-emerald-500/50",
      shadowColor: "hover:shadow-emerald-500/20",
    },
    {
      title: t('skills.os'),
      description: t('skills.osDesc'),
      icon: Terminal,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "hover:border-yellow-500/50",
      shadowColor: "hover:shadow-yellow-500/20",
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t('skills.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4">
              {t('skills.desc')}
            </p>
            <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto"></div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCards.map((skill, index) => (
            <Reveal key={index} width="100%">
              <div
                className={`group h-full p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${skill.borderColor} ${skill.shadowColor}`}
              >
                <div className="flex flex-col h-full">
                  {/* Icon Header */}
                  <div className="mb-6 inline-block">
                    <div className={`p-4 rounded-2xl ${skill.bgColor} w-fit`}>
                      <skill.icon
                        className={`w-10 h-10 ${skill.color}`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {skill.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
