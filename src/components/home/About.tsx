import React from "react";
import { User, Terminal, Coffee } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Reveal } from "../ui/Reveal";

// Tự động tính toán tuổi dựa trên năm sinh và năm hiện tại
const birthYear = 2003;
const age = new Date().getFullYear() - birthYear;

const About: React.FC = () => {
  const { t, language } = useLanguage();
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
          <div className="relative">
            <Reveal width="100%">
              <div className="relative bg-slate-50/10 dark:bg-zinc-900/10 p-8 border border-slate-200/80 dark:border-zinc-800/80 backdrop-blur-sm relative overflow-visible">
                {/* Họa tiết trang trí góc giả lập lưới thiết kế (Grid brackets) */}
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
                <div className="flex flex-col items-center p-4 bg-slate-50/10 dark:bg-zinc-900/10 border border-slate-200/60 dark:border-zinc-800/60 hover:border-blue-500/50 transition-all duration-300 relative overflow-visible group">
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
                <div className="flex flex-col items-center p-4 bg-slate-50/10 dark:bg-zinc-900/10 border border-slate-200/60 dark:border-zinc-800/60 hover:border-blue-500/50 transition-all duration-300 relative overflow-visible group">
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
                <div className="flex flex-col items-center p-4 bg-slate-50/10 dark:bg-zinc-900/10 border border-slate-200/60 dark:border-zinc-800/60 hover:border-blue-500/50 transition-all duration-300 relative overflow-visible group">
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

        {/* Timeline Học vấn & Kinh nghiệm */}
        <div className="mt-20 pt-16 border-t border-slate-200/80 dark:border-zinc-800/80 max-w-4xl mx-auto">
          <Reveal width="100%">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              {language === 'vi' ? 'Học vấn & Kinh nghiệm' : 'Education & Experience'}
            </h3>
          </Reveal>

          <div className="relative pl-6 md:pl-8 border-l-2 border-slate-200 dark:border-zinc-800 space-y-12">
            {[
              {
                year: "2026 - Hiện tại",
                yearEn: "2026 - Present",
                title: "AI Applications / AI Engineer",
                titleEn: "AI Applications / AI Engineer",
                institution: "VinUni & Tập đoàn Vingroup",
                institutionEn: "VinUni & Vingroup Group",
                description: "Chuyên ngành chuyên sâu (Track): AI Applications (Ứng dụng AI). Đã hoàn thành 6 tuần đào tạo nền tảng & mô phỏng thực chiến; chuẩn bị bước vào giai đoạn thực tập 6 tuần tại doanh nghiệp. Làm chủ tư duy AI, đạo đức AI và thiết lập luồng xử lý AI Agents, tích hợp LLMs.",
                descriptionEn: "Specialized Track: AI Applications. Completed 6 weeks of foundational & simulated hands-on training; preparing for a 6-week corporate internship. Mastered AI thinking, ethics, and designing AI Agent workflows integrated with LLMs."
              },
              {
                year: "2025 - 2025",
                yearEn: "2025 - 2025",
                title: "Thực tập sinh Lập trình phần mềm",
                titleEn: "Software Development Intern",
                institution: "Công ty CP Công nghệ Quảng Ích",
                institutionEn: "Quang Ich Technology Joint Stock Company",
                description: "Đơn vị phát triển hệ thống eNetViet & Phần mềm Giáo dục. Tham gia phát triển tính năng cho hệ thống eNetViet (Ứng dụng kết nối giáo dục) và Hệ thống Thư viện Điện tử. Sử dụng Next.js và Material UI (MUI) để xây dựng CMS quản lý và liên lạc trường học; viết các hàm xử lý logic nghiệp vụ, đồng bộ Client-Server.",
                descriptionEn: "Developer of eNetViet & Education Systems. Developed features for eNetViet (school-parent communication app) and the Digital Library CMS. Used Next.js and Material UI (MUI) for library management, designed search filters, wrote API logic, and synchronized Client-Server data."
              },
              {
                year: "2021 - 2024",
                yearEn: "2021 - 2024",
                title: "Sinh viên Kỹ thuật phần mềm",
                titleEn: "Software Engineering Student",
                institution: "Cao đẳng Anh Quốc BTEC FPT",
                institutionEn: "BTEC FPT British College",
                description: "Chuyên ngành: Kỹ thuật phần mềm. Xếp loại tốt nghiệp: Pass (Hoàn thành chương trình đào tạo chuẩn Anh Quốc).",
                descriptionEn: "Major: Software Engineering. Graduation grade: Pass (Completed the UK-standard curriculum)."
              }
            ].map((item, idx) => (
              <Reveal key={idx} width="100%">
                <div className="relative">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 flex size-4 sm:size-5 items-center justify-center rounded-full bg-blue-600 border-4 border-slate-50 dark:border-zinc-950" />
                  
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
                    <span className="font-mono text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 shrink-0 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded">
                      {language === 'en' ? item.yearEn : item.year}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {language === 'en' ? item.titleEn : item.title}
                    </h4>
                  </div>
                  
                  <div className="text-sm font-semibold text-slate-500 dark:text-zinc-400 mb-3">
                    {language === 'en' ? item.institutionEn : item.institution}
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    {language === 'en' ? item.descriptionEn : item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
