import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Reveal } from "../ui/Reveal";

const Skills: React.FC = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: "Languages",
      badges: [
        { name: "html5", src: "https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white&labelColor=%23E34F26" },
        { name: "css3", src: "https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white&labelColor=%231572B6" },
        { name: "SASS", src: "https://img.shields.io/badge/SASS-%23CC6699.svg?style=flat&logo=sass&logoColor=white&labelColor=%23CC6699" },
        { name: "Javascript", src: "https://img.shields.io/badge/Javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E&labelColor=%23323330" },
        { name: "Python", src: "https://img.shields.io/badge/Python-%233776AB.svg?style=flat&logo=python&logoColor=white&labelColor=%233776AB" },
        { name: "Typescript", src: "https://img.shields.io/badge/Typescript-%233178C6.svg?style=flat&logo=typescript&logoColor=white&labelColor=%233178C6" },
      ],
    },
    {
      title: "Frameworks & Runtimes",
      badges: [
        { name: "Reactjs", src: "https://img.shields.io/badge/Reactjs-%2320232A.svg?style=flat&logo=react&logoColor=%2361DAFB&labelColor=%2320232A" },
        { name: "Nextjs", src: "https://img.shields.io/badge/Nextjs-%23000000.svg?style=flat&logo=nextdotjs&logoColor=white&labelColor=%23000000" },
        { name: "Nodejs", src: "https://img.shields.io/badge/Nodejs-%23339933.svg?style=flat&logo=nodedotjs&logoColor=white&labelColor=%23339933" },
        { name: "Expressjs", src: "https://img.shields.io/badge/Expressjs-%23339933.svg?style=flat&logo=express&logoColor=white&labelColor=%23339933" },
      ],
    },
    {
      title: "Tools & Databases",
      badges: [
        { name: "SQL Server", src: "https://img.shields.io/badge/SQL_Server-%23CC2927.svg?style=flat&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDQuMjQgMiA3djEwYzAgMi43NiA0LjQ4IDUgMTAgNXMxMC0yLjI0IDEwLTVWN2MwLTIuNzYtNC40OC01LTEwLTV6bTAgMThjLTQuNDEgMC04LTEuNzktOC00di0xLjEyYzIuMDYgMS40NSA1LjI4IDIuMTIgOCAyLjEyczUuOTQtLjY3IDgtMi4xMlYxNmMwIDIuMjEtMy41OSA0LTggNHptMC02Yy00LjQxIDAtOC0xLjc5LTgtNHYxLjEyQzYuMDYgMTAuMzMgOS4yOCAxMSAxMiAxMXM1Ljk0LS42NyA4LTIuMTJWMTBjMCAyLjIxLTMuNTkgNC04IDR6bTAtNmMtNC40MSAwLTgtMS43OS04LTRzMy41OS00IDgtNCA4IDEuNzkgOCA0LTMuNTkgNC04IDR6Ii8+PC9zdmc+&logoColor=white&labelColor=%23CC2927" },
        { name: "MongoDB", src: "https://img.shields.io/badge/MongoDB-%2347A248.svg?style=flat&logo=mongodb&logoColor=white&labelColor=%2347A248" },
        { name: "Docker", src: "https://img.shields.io/badge/Docker-%232496ED.svg?style=flat&logo=docker&logoColor=white&labelColor=%232496ED" },
        { name: "Nginx", src: "https://img.shields.io/badge/Nginx-%23009639.svg?style=flat&logo=nginx&logoColor=white&labelColor=%23009639" },
        { name: "Git", src: "https://img.shields.io/badge/Git-%23F05032.svg?style=flat&logo=git&logoColor=white&labelColor=%23F05032" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 bg-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t("skills.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4">
              {t("skills.desc")}
            </p>
            <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto"></div>
          </Reveal>
        </div>

        <Reveal width="100%">
          <div className="p-6 md:p-10 border border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/10 dark:bg-zinc-900/10 backdrop-blur-sm relative overflow-visible">
            {/* Họa tiết trang trí góc vuông */}
            <div className="absolute -top-px -left-px w-2 h-2 -translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
            <div className="absolute -top-px -right-px w-2 h-2 translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
            <div className="absolute -bottom-px -left-px w-2 h-2 -translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
            <div className="absolute -bottom-px -right-px w-2 h-2 translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900" />
            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
              {categories.map((category, catIndex) => (
                <div
                  key={catIndex}
                  className="flex flex-col gap-4 pb-8 border-b border-slate-100 dark:border-slate-800 last:border-b-0 last:pb-0"
                >
                  <div className="shrink-0">
                    <span className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                      {category.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-2.5">
                    {category.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="hover:scale-105 transition-transform duration-200 select-none shadow-sm hover:shadow rounded overflow-hidden shrink-0"
                      >
                        <img
                          src={badge.src}
                          alt={badge.name}
                          className="h-[22px] md:h-[26px] block"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
