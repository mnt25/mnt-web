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
      sourceCode: "https://github.com/mnt25/",
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
      sourceCode: "https://github.com/mnt25/mnt-web",
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
      sourceCode: "https://github.com/mnt25/Weather-Dashboard",
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
      sourceCode: "https://github.com/mnt25",
      isVisible: true
    }
  ];

  useEffect(() => {
    // Truy xuất danh sách dự án từ API; tự động chuyển sang fallback mặc định nếu gặp lỗi hoặc dữ liệu trống
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
        return `${parts[1]}/${parts[0]}`; // Trả về định dạng tháng/năm (MM/YYYY)
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
                  {/* Họa tiết góc trang trí các thẻ */}
                  <div className="absolute -top-px -left-px w-2 h-2 -translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900 z-10" />
                  <div className="absolute -top-px -right-px w-2 h-2 translate-x-1/2 -translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900 z-10" />
                  <div className="absolute -bottom-px -left-px w-2 h-2 -translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900 z-10" />
                  <div className="absolute -bottom-px -right-px w-2 h-2 translate-x-1/2 translate-y-1/2 border border-slate-300 dark:border-zinc-700 pointer-events-none bg-slate-50 dark:bg-zinc-900 z-10" />

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {language === 'en' && project.titleEn ? project.titleEn : project.title}
                    </h3>
                    
                    {project.startDate && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold font-mono block mb-3">
                        {formatDateRange(project.startDate, project.endDate)}
                      </span>
                    )}

                    <p 
                      className="text-slate-600 dark:text-slate-400 text-sm leading-snug mb-4 h-[3.6rem] max-h-[3.6rem] overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {language === 'en' && project.descriptionEn ? project.descriptionEn : project.description}
                    </p>

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

                    {(() => {
                      const hasSourceCode = Boolean(project.sourceCode && project.sourceCode.trim() !== "" && project.sourceCode !== "#");
                      const hasLiveDemo = Boolean(project.liveDemo && project.liveDemo.trim() !== "" && project.liveDemo !== "#");

                      return (
                        <div className="flex items-center gap-4 mt-auto pt-2">
                          {hasSourceCode ? (
                            <a
                              href={project.sourceCode}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-zinc-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-colors"
                            >
                              <FiGithub className="w-4 h-4 mr-2" />
                              {t('projects.code')}
                            </a>
                          ) : (
                            <span
                              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-slate-200 dark:border-zinc-800 text-sm font-medium text-slate-400 dark:text-zinc-600 opacity-40 cursor-not-allowed select-none"
                              title={language === 'en' ? "Source code not public" : "Chưa mở source code"}
                            >
                              <FiGithub className="w-4 h-4 mr-2" />
                              {t('projects.code')}
                            </span>
                          )}

                          {hasLiveDemo ? (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white transition-colors shadow-lg shadow-blue-500/25"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t('projects.demo')}
                            </a>
                          ) : (
                            <span
                              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-slate-200/60 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-sm font-medium text-slate-400 dark:text-zinc-600 opacity-40 cursor-not-allowed select-none"
                              title={language === 'en' ? "Live Demo not available" : "Chưa có Live Demo"}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t('projects.demo')}
                            </span>
                          )}
                        </div>
                      );
                    })()}
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
