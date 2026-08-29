import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
    {
      id: "p1",
      title: "AI Scene Understanding for Mobile Robots",
      titleEn: "AI Scene Understanding for Mobile Robots",
      startDate: "2026-01",
      endDate: "Present",
      description: "Hệ thống giám sát thời gian thực giúp người vận hành hiểu ngữ cảnh xung quanh robot di động trong nhà (kho hàng, nhà máy). AI tích hợp (Qwen2.5-VL + 3D-R1 chạy trên đám mây RunPod GPU Cloud) tự động phân tích mức độ nguy hiểm, giải thích lý do và đề xuất robot giảm tốc/dừng lại.",
      descriptionEn: "Real-time monitoring system helping operators understand mobile robot surroundings in indoor environments. Integrates Qwen2.5-VL and 3D-R1 models on RunPod GPU Cloud to analyze danger levels, output reasoning steps, and suggest safety commands.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Tailwind CSS", "FastAPI", "MongoDB", "RunPod GPU", "Qwen2.5-VL"],
      liveDemo: "https://c2-app-137.io.vn/",
      sourceCode: "https://github.com/ps257/",
      isVisible: true
    },
    {
      id: "p2",
      title: "MNT Web - Portfolio & Admin Dashboard",
      titleEn: "MNT Web - Portfolio & Admin Dashboard",
      startDate: "2025-01",
      endDate: "2025-12",
      description: "Website Portfolio tích hợp hệ thống Dashboard quản trị bảo mật để quản trị dữ liệu động và luồng thông tin của hệ thống. Xây dựng Admin Dashboard phân quyền và xác thực (Authentication) phục vụ CRUD dự án, tích hợp contact form với Discord Webhook.",
      descriptionEn: "Personal portfolio website integrated with a secure Admin Dashboard for dynamic data and system flow management. Features authentication, role-based access control, and a contact form integrated with Discord Webhook.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "TypeScript", "Node.js", "TailwindCSS", "Neon Tech DB", "Express"],
      liveDemo: "https://mnt.id.vn",
      sourceCode: "https://github.com/ps257/mnt-web",
      isVisible: true
    },
    {
      id: "p3",
      title: "Weather Dashboard & Analytics",
      titleEn: "Weather Dashboard & Analytics",
      startDate: "2025-01",
      endDate: "2025-12",
      description: "Ứng dụng theo dõi, phân tích trực quan dữ liệu thời tiết và chất lượng môi trường thời gian thực trên toàn cầu. Tích hợp API thời tiết quốc tế, trực quan hóa dữ liệu chỉ số AQI, chu kỳ mặt trời qua thư viện Recharts.",
      descriptionEn: "Global real-time weather and environmental quality tracking application. Integrates international weather APIs and visualizes AQI index, solar cycles, and temperatures using advanced Recharts components.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "TypeScript", "Bootstrap 5", "Recharts API"],
      liveDemo: "https://mnt-weather-dashboard.vercel.app",
      sourceCode: "https://github.com/ps257/Weather-Dashboard",
      isVisible: true
    },
    {
      id: "p4",
      title: "Hệ thống đặt phòng trực tuyến",
      titleEn: "Online Booking Room System",
      startDate: "2023-01",
      endDate: "2024-12",
      description: "Hệ thống đặt phòng trực tuyến tích hợp cơ chế quản lý phòng, kiểm soát trạng thái đơn hàng cho admin và luồng đặt phòng cho khách hàng. Đóng góp thiết kế cơ sở dữ liệu SQL Server, lập trình API logic nghiệp vụ và xây dựng Admin Dashboard.",
      descriptionEn: "Online room booking system with room management and order status tracking. Features SQL Server database design, business logic APIs, and an intuitive Admin Dashboard for room lifecycle management.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      tags: ["HTML/CSS", "PHP", "JavaScript", "SQL Server"],
      liveDemo: "#",
      sourceCode: "https://github.com/ps257",
      isVisible: true
    }
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
      } catch {
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
        return "Hiện tại";
      }
      const parts = dateStr.split("-");
      if (parts.length === 2) {
        return `${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    };

    const start = formatMonthYear(startDate);
    const end = endDate ? (endDate === "Present" && language === "en" ? "Present" : formatMonthYear(endDate)) : "Present";

    return (
      <span className="inline-flex items-center gap-1 font-mono text-xs text-cyan-600 dark:text-cyan-400">
        <span>{start}</span>
        <span className="opacity-40">—</span>
        <span>{end}</span>
      </span>
    );
  };

  return (
    <section
      id="projects"
      className="pt-4 sm:pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300"
    >
      {/* Section Header */}
      <div className="mb-8 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            <span>{t('projects.title.part1')}</span>{" "}
            <span className="text-cyan-600 dark:text-cyan-400">{t('projects.title.part2')}</span>
          </h2>
        </Reveal>
      </div>

      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-zinc-500">
          {t('projects.loading')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: Project) => {
            const hasSourceCode = Boolean(project.sourceCode && project.sourceCode.trim() !== "" && project.sourceCode !== "#");
            const hasLiveDemo = Boolean(project.liveDemo && project.liveDemo.trim() !== "" && project.liveDemo !== "#");

            return (
              <Reveal key={project.id} width="100%">
                <div className="group rounded-2xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30">
                  {/* Image Showcase Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {project.startDate && formatDateRange(project.startDate, project.endDate)}
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors mb-3">
                        {language === 'en' && project.titleEn ? project.titleEn : project.title}
                      </h3>

                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                        {language === 'en' && project.descriptionEn ? project.descriptionEn : project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-black/5 dark:border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
                        {hasLiveDemo ? (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-medium bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <span>{t('projects.demo')}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed opacity-60"
                            title={language === 'en' ? "Live Demo not available" : "Chưa có Live Demo"}
                          >
                            <span>{t('projects.demo')}</span>
                          </span>
                        )}

                        {hasSourceCode ? (
                          <a
                            href={project.sourceCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <FiGithub className="w-3.5 h-3.5" />
                            <span>{t('projects.code')}</span>
                          </a>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed opacity-60"
                            title={language === 'en' ? "Source code private" : "Chưa mở source code"}
                          >
                            <FiGithub className="w-3.5 h-3.5" />
                            <span>{t('projects.code')}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Projects;
