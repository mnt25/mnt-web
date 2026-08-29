import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Reveal } from "../ui/Reveal";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiGit,
  SiDocker,
  SiLinux,
  SiNginx,
  SiVercel,
  SiPostman,
} from "react-icons/si";
import { FaJava, FaWindows } from "react-icons/fa6";

const CSharpIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7.5V16.5L12 22L22 16.5V7.5L12 2Z" fill="rgba(81, 43, 212, 0.15)" stroke="#512BD4" strokeWidth="1.6" strokeLinejoin="round" />
    <text x="6" y="15.5" fill="#512BD4" fontSize="10" fontWeight="bold" fontFamily="monospace">C#</text>
  </svg>
);

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

const Skills: React.FC = () => {
  const { t } = useLanguage();

  // Ordered strictly: Frontend -> Backend -> Database -> AI -> Tools & DevOps
  const skills: SkillItem[] = [
    // 1. FRONTEND (FE)
    { name: "HTML/CSS", icon: <SiHtml5 className="w-5 h-5 text-[#E34F26]" /> },
    { name: "JavaScript", icon: <SiJavascript className="w-5 h-5 text-[#F7DF1E]" /> },
    { name: "TypeScript", icon: <SiTypescript className="w-5 h-5 text-[#3178C6]" /> },
    { name: "React.js", icon: <SiReact className="w-5 h-5 text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5 text-zinc-950 dark:text-white" /> },
    { name: "Vue.js", icon: <SiVuedotjs className="w-5 h-5 text-[#4FC08D]" /> },

    // 2. BACKEND (BE)
    { name: "Python", icon: <SiPython className="w-5 h-5 text-[#3776AB]" /> },
    { name: "C#", icon: <CSharpIcon /> },
    { name: "Java", icon: <FaJava className="w-5 h-5 text-[#ED8B00]" /> },
    { name: "FastAPI", icon: <SiFastapi className="w-5 h-5 text-[#009688]" /> },

    // 3. DATABASE
    { name: "PostgreSQL", icon: <SiPostgresql className="w-5 h-5 text-[#4169E1]" /> },
    { name: "MongoDB", icon: <SiMongodb className="w-5 h-5 text-[#47A248]" /> },
    { name: "MySQL", icon: <SiMysql className="w-5 h-5 text-[#4479A1]" /> },

    // 4. AI
    { name: "LangChain / LangGraph", icon: <span className="text-xl leading-none select-none">🦜</span> },
    { name: "HuggingFace", icon: <span className="text-xl leading-none select-none">🤗</span> },

    // 5. TOOLS & DEVOPS
    { name: "Git", icon: <SiGit className="w-5 h-5 text-[#F05032]" /> },
    { name: "Docker", icon: <SiDocker className="w-5 h-5 text-[#2496ED]" /> },
    { name: "Linux", icon: <SiLinux className="w-5 h-5 text-zinc-900 dark:text-zinc-100" /> },
    { name: "Windows", icon: <FaWindows className="w-5 h-5 text-[#0078D6]" /> },
    { name: "Nginx", icon: <SiNginx className="w-5 h-5 text-[#009639]" /> },
    { name: "Vercel", icon: <SiVercel className="w-5 h-5 text-zinc-950 dark:text-white" /> },
    { name: "Postman", icon: <SiPostman className="w-5 h-5 text-[#FF6C37]" /> },
  ];

  return (
    <section
      id="skills"
      className="pt-4 sm:pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300"
    >
      {/* Section Header */}
      <div className="mb-8 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            <span>{t("skills.title.part1")}</span>{" "}
            <span className="text-cyan-600 dark:text-cyan-400">{t("skills.title.part2")}</span>
          </h2>
        </Reveal>
      </div>

      {/* Clean Minimal Tech Grid (Icon + Name Only) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5">
        {skills.map((skill) => (
          <Reveal key={skill.name} width="100%">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-cyan-500 dark:hover:border-cyan-400 hover:ring-1 hover:ring-cyan-500/40 dark:hover:ring-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/15 dark:hover:shadow-cyan-500/20 transition-all duration-300 flex items-center gap-3 cursor-default">
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-black/5 dark:border-white/5 flex items-center justify-center shrink-0">
                {skill.icon}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
                {skill.name}
              </h4>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
