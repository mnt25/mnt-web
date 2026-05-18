import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import type { Project } from "../../types/project";
import { Reveal } from "../ui/Reveal";
import { FiGithub } from "react-icons/fi";
import { api } from "../../../server/api";

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fallbackProjects: Project[] = [

  ];

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await api.getProjects(true);
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.error("Fetch projects error, using mock fallback projects:", err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate) return null;

    const formatMonthYear = (dateStr: string) => {
      if (dateStr === "Present") {
        return <span className="text-base font-extrabold leading-none inline-block align-middle font-sans">∞</span>;
      }
      const parts = dateStr.split("-");
      if (parts.length === 2) {
        return `${parts[1]}/${parts[0]}`; // MM/YYYY
      }
      return dateStr;
    };

    const start = formatMonthYear(startDate);
    const end = endDate ? formatMonthYear(endDate) : <span className="text-base font-extrabold leading-none inline-block align-middle font-sans">∞</span>;

    return (
      <span className="inline-flex items-center gap-1">
        <span>{start}</span>
        <span className="opacity-60 mx-0.5">—</span>
        <span>{end}</span>
      </span>
    );
  };

  return (
    <section
      id="projects"
      className="py-20 bg-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t('projects.desc')}
            </p>
          </Reveal>
        </div>

        {loading ? (
          <div className="text-center text-slate-500">{t('projects.loading')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project) => (
              <Reveal key={project.id} width="100%">
                <div className="group bg-slate-50/10 dark:bg-zinc-900/10 border border-slate-200/80 dark:border-zinc-800/80 hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full backdrop-blur-sm relative overflow-visible">
                  {/* Corner grid bracket marks */}
                  <div className="absolute -top-px -left-px w-2 h-2 -translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900 z-10" />
                  <div className="absolute -top-px -right-px w-2 h-2 translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900 z-10" />
                  <div className="absolute -bottom-px -left-px w-2 h-2 -translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900 z-10" />
                  <div className="absolute -bottom-px -right-px w-2 h-2 translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900 z-10" />

                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {language === 'en' && project.titleEn ? project.titleEn : project.title}
                    </h3>
                    
                    {project.startDate && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold font-mono block mb-3">
                        {formatDateRange(project.startDate, project.endDate)}
                      </span>
                    )}

                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                      {language === 'en' && project.descriptionEn ? project.descriptionEn : project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs font-mono border border-slate-200 dark:border-zinc-800/80 bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-auto">
                      <a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-zinc-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <FiGithub className="w-4 h-4 mr-2" />
                        {t('projects.code')}
                      </a>
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white transition-colors shadow-lg shadow-blue-500/25"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t('projects.demo')}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
