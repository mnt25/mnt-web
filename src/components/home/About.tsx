import React from "react";
import { Code2, Lightbulb, Users, Zap, ExternalLink } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Reveal } from "../ui/Reveal";
import { Separator } from "../ui/Separator";

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const timelineItems = [
    {
      year: "2026",
      yearEn: "2026",
      title: "Thực tập sinh AI / AI Engineer Intern",
      titleEn: "AI Engineer Intern",
      institution: "VinSmart Future",
      institutionEn: "VinSmart Future",
      link: "https://www.facebook.com/CareersVSF/",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2e3tKg--d-socjEuhoRwZ_FcnKAr49z5oUrTjNs3QW7tBOZz0",
      type: "work",
      description: "Thực tập nghiên cứu và phát triển hệ sinh thái Trợ lý AI Bất động sản. Xây dựng kiến trúc phân tán gồm 3 thành phần cốt lõi: Giao diện tương tác người dùng (Frontend), Máy chủ giao thức Model Context Protocol (MCP Server), và Agent AI tự động phân tích nhu cầu, định giá và tra cứu dữ liệu thị trường theo thời gian thực.",
      descriptionEn: "Internship focused on researching and developing an end-to-end Real Estate AI Assistant ecosystem. Built a modular architecture comprising 3 core components: Interactive User Interface (Frontend), Model Context Protocol server (MCP Server), and an autonomous AI Agent for valuation, advisory, and real-time market queries.",
      tags: ["AI Intern", "AI Agents", "MCP Protocol", "Real Estate AI", "Next.js", "Python"],
    },
    {
      year: "2026",
      yearEn: "2026",
      title: "AI Applications / AI Engineer",
      titleEn: "AI Applications / AI Engineer",
      institution: "VinUni & Tập đoàn Vingroup",
      institutionEn: "VinUni & Vingroup Group",
      link: "https://vinuni.edu.vn/aithucchien/",
      domain: "vinuni.edu.vn",
      type: "education",
      description: "Chuyên ngành chuyên sâu (Track): AI Applications (Ứng dụng AI). Đã hoàn thành chương trình đào tạo nền tảng, mô phỏng thực chiến và thực tập doanh nghiệp. Làm chủ tư duy AI, đạo đức AI, thiết lập luồng xử lý AI Agents và tích hợp các mô hình LLMs vào thực tế.",
      descriptionEn: "Specialized Track: AI Applications. Completed foundational training, hands-on simulations, and corporate internship. Mastered AI thinking, ethics, designing AI Agent workflows, and integrating LLMs into practical applications.",
      tags: ["AI Applications", "AI Agents", "LLMs", "VinUni", "Vingroup"],
    },
    {
      year: "2025",
      yearEn: "2025",
      title: "Thực tập sinh Lập trình phần mềm",
      titleEn: "Software Development Intern",
      institution: "Công ty CP Công nghệ Quảng Ích",
      institutionEn: "Quang Ich Technology Joint Stock Company",
      link: "https://qig.vn/",
      domain: "qig.vn",
      type: "work",
      description: "Đơn vị phát triển hệ thống eNetViet & Phần mềm Giáo dục. Tham gia phát triển tính năng cho hệ thống eNetViet và Hệ thống Thư viện Điện tử. Sử dụng Next.js và Material UI (MUI) để xây dựng CMS quản lý; viết các hàm xử lý logic nghiệp vụ, đồng bộ Client-Server.",
      descriptionEn: "Developer of eNetViet & Education Systems. Developed features for eNetViet and the Digital Library CMS. Used Next.js and Material UI (MUI) for library management, designed search filters, wrote API logic, and synchronized Client-Server data.",
      tags: ["Next.js", "MUI", "CMS", "eNetViet", "Client-Server Sync"],
    },
    {
      year: "2021 - 2024",
      yearEn: "2021 - 2024",
      title: "Sinh viên Kỹ thuật phần mềm",
      titleEn: "Software Engineering Student",
      institution: "Cao đẳng Anh Quốc BTEC FPT",
      institutionEn: "BTEC FPT British College",
      link: "https://btec.fpt.edu.vn/",
      domain: "btec.fpt.edu.vn",
      type: "education",
      description: "Chuyên ngành: Kỹ thuật phần mềm. Xếp loại tốt nghiệp: Pass (Hoàn thành toàn bộ chương trình đào tạo chuẩn Anh Quốc Pearson).",
      descriptionEn: "Major: Software Engineering. Graduation grade: Pass (Completed the UK Pearson standard curriculum).",
      tags: ["Software Engineering", "Pearson UK", "BTEC FPT"],
    },
  ];

  return (
    <section
      id="about"
      className="pt-4 sm:pt-6 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300"
    >
      {/* Section Header */}
      <div className="mb-8 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            <span>{t('about.title.part1')}</span>{" "}
            <span className="text-cyan-600 dark:text-cyan-400">{t('about.title.part2')}</span>
          </h2>
        </Reveal>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-24">
        {/* Left Column: Narrative Story */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          <Reveal>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mb-6">
              {t('about.journeyTitle')}
            </h3>
          </Reveal>

          <Reveal>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base pt-1">
              {t('about.journeyDesc1')}{" "}
              <a
                href="https://btec.fpt.edu.vn/nghanh-hoc/ky-thuat-phan-mem/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
              >
                {t('about.journeyDesc1School')}
              </a>
              {language === 'vi' ? ' và đã hoàn thành chuyên sâu Track AI Applications tại ' : ' and completed the specialized AI Applications Track at '}
              <a
                href="https://vinuni.edu.vn/aithucchien/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
              >
                {language === 'vi' ? 'Chương trình Đào tạo Nhân tài AI Thực chiến (VinUni & Vingroup)' : 'Talent AI Bootcamp (VinUni & Vingroup)'}
              </a>
              .
            </p>
          </Reveal>

          <Reveal>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
              {t('about.journeyDesc2')}
            </p>
          </Reveal>

          <Reveal>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
              {t('about.journeyDesc3')}
            </p>
          </Reveal>
        </div>

        {/* Right Column: How I Work (4 Cards 2x2 Grid) */}
        <div className="lg:col-span-6 w-full space-y-4">
          <Reveal>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mb-6">
              {t('about.howIWork')}
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Clean Code */}
            <Reveal width="100%">
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-500 group-hover:scale-110 transition-transform">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-2">
                  {t('about.work.cleanCode.title')}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t('about.work.cleanCode.desc')}
                </p>
              </div>
            </Reveal>

            {/* Card 2: Innovation */}
            <Reveal width="100%">
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-amber-500/40 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-500 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-2">
                  {t('about.work.innovation.title')}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t('about.work.innovation.desc')}
                </p>
              </div>
            </Reveal>

            {/* Card 3: Collaboration */}
            <Reveal width="100%">
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-500 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-2">
                  {t('about.work.collaboration.title')}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t('about.work.collaboration.desc')}
                </p>
              </div>
            </Reveal>

            {/* Card 4: Performance */}
            <Reveal width="100%">
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-yellow-500/40 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 dark:bg-yellow-500/15 border border-yellow-500/20 flex items-center justify-center mb-4 text-yellow-500 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-2">
                  {t('about.work.performance.title')}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t('about.work.performance.desc')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Separator có chấm trước menu Kinh Nghiệm */}
      <Separator hasDot={true} className="my-10 sm:my-12" />

      {/* Education & Experience Roadmap Timeline */}
      <div id="experience" className="pt-4 sm:pt-6 scroll-mt-24">
        <Reveal>
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
              <span>{t('experience.title.part1')}</span>{" "}
              <span className="text-cyan-600 dark:text-cyan-400">{t('experience.title.part2')}</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative pl-6 sm:pl-8 border-l border-zinc-200 dark:border-zinc-800 space-y-10 max-w-4xl">
          {timelineItems.map((item, idx) => (
            <Reveal key={idx} width="100%">
              <div className="relative group">
                {/* Milestone Indicator Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border-2 border-zinc-50 dark:border-zinc-900 group-hover:scale-125 transition-transform duration-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                </div>

                {/* Milestone Card */}
                <div className="rounded-2xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-7 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 border border-black/5 dark:border-white/10">
                      {language === 'en' && item.yearEn ? item.yearEn : item.year}
                    </span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold hover:bg-cyan-500/20 dark:hover:bg-cyan-500/25 transition-all group/link"
                      >
                        {item.logoUrl ? (
                          <img
                            src={item.logoUrl}
                            alt={item.institution}
                            className="w-3.5 h-3.5 rounded-full object-cover shrink-0"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : item.domain ? (
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
                            alt={item.institution}
                            className="w-3.5 h-3.5 rounded-full object-contain shrink-0"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                        <span>{item.institutionEn && language === 'en' ? item.institutionEn : item.institution}</span>
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shrink-0" />
                      </a>
                    )}
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mb-2">
                    {language === 'en' && item.titleEn ? item.titleEn : item.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {language === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
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

export default About;
