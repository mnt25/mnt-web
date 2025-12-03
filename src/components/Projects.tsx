import React from "react";
import { ExternalLink } from "lucide-react";
import type { Project } from "../types/project";
import { Reveal } from "./UI/Reveal";
import { FiGithub } from "react-icons/fi";

const projects: Project[] = [
  {
    title: "Product",
    description:
      "demo",
    image: "https://picsum.photos/seed/shop/600/400",
    tags: ["React", "Redux", "Node.js", "MongoDB", "Tailwind"],
    liveDemo: "#",
    sourceCode: "#",
  },
    {
    title: "Product",
    description:
      "demo",
    image: "https://picsum.photos/seed/shop/600/400",
    tags: ["React", "Redux", "Node.js", "MongoDB", "Tailwind"],
    liveDemo: "#",
    sourceCode: "#",
  },
    {
    title: "Product",
    description:
      "demo",
    image: "https://picsum.photos/seed/shop/600/400",
    tags: ["React", "Redux", "Node.js", "MongoDB", "Tailwind"],
    liveDemo: "#",
    sourceCode: "#",
  },
];

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Dự án nổi bật
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Một số dự án cá nhân mà tôi đã thực hiện để rèn luyện kỹ năng.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={index} width="100%">
              <div className="group bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 dark:hover:shadow-blue-900/20 flex flex-col h-full">
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
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-auto">
                    <a
                      href={project.sourceCode}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <FiGithub className="w-4 h-4 mr-2" />
                      Code
                    </a>
                    <a
                      href={project.liveDemo}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
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

export default Projects;
