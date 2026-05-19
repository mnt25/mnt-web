import React, { useEffect, useState } from 'react';
import { Download, Mail, MapPin, Globe } from 'lucide-react';
import { FaFacebookF, FaTelegramPlane, FaGithub } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { useLanguage } from "../../context/LanguageContext";
import { Reveal } from "../ui/Reveal";
import { Dialog } from "../ui/Dialog";
import { Separator } from "../ui/Separator";
import { api } from '../../../server/api';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [cvLink, setCvLink] = useState<string>('#');
  const [isCVEnabled, setIsCVEnabled] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = language === 'vi' ? [
    "Tốt nghiệp chuyên ngành Kỹ thuật phần mềm",
    "Đam mê xây dựng các ứng dụng web hiện đại",
    "Tối ưu trải nghiệm người dùng",
  ] : [
    "Computer Science Graduate",
    "Passionate in building modern web applications",
    "Enthusiastic about optimizing user experience",
  ];

  useEffect(() => {
    // Lấy trạng thái kích hoạt và liên kết tải CV từ API hệ thống
    const fetchCVData = async () => {
      const status = await api.getAccountStatus();
      setIsCVEnabled(status.enabled);

      if (status.enabled) {
        const cvData = await api.getCVLink();
        setCvLink(cvData.link);
      } else {
        setCvLink("#");
      }
    };
    fetchCVData();
  }, []);

  useEffect(() => {
    // Tự động xoay vòng danh sách vai trò (roles) mỗi 3 giây
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Ngăn chặn tải xuống và hiển thị thông báo nếu tính năng này bị khóa từ phía Admin
    if (!isCVEnabled) {
      e.preventDefault();
      setShowDialog(true);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[70vh] flex flex-col items-center justify-start overflow-visible bg-transparent transition-colors duration-300 pt-24 sm:pt-36 pb-12"
    >
      {/* Hiệu ứng màu nền chuyển sắc cho Light mode (ẩn ở Dark mode để giữ nền đen sâu tối giản) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none dark:hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] mix-blend-multiply"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center z-10 w-full overflow-visible">
        <Reveal overflow="visible">
          <div className="w-full max-w-2xl relative transition-all duration-300 bg-transparent overflow-visible">

            <div className="flex w-full relative overflow-visible">
              {/* Đường kẻ mảnh kẻ ngang tràn viền (Full-bleed border) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300vw] h-px bg-slate-200/80 dark:bg-zinc-800/80 pointer-events-none" />

              <div className="w-[112px] sm:w-[180px] shrink-0 border-l border-r border-slate-200 dark:border-zinc-800/80 p-2 sm:p-4 flex flex-col items-center justify-center bg-transparent relative z-10">
                <div id="hero-avatar" className="h-24 w-24 sm:h-36 sm:w-36 rounded-full border border-slate-200 dark:border-zinc-800/80 overflow-hidden bg-slate-50 dark:bg-zinc-950 flex items-center justify-center shadow-lg relative flex-shrink-0 group z-10 ring-1 ring-slate-200 dark:ring-zinc-800 ring-offset-2 ring-offset-white dark:ring-offset-black">
                  {/* Họa tiết chấm bi liti làm nền cho khung chứa Avatar */}
                  <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1.5px,transparent_1.5px)] [background-size:8px_8px] pointer-events-none opacity-85 z-0" />
                  
                  <div className="icon-logo h-full w-full p-2 flex items-center justify-center relative z-10">
                    <svg viewBox="0 0 304 304" className="w-[85%] h-[85%]" fill="none">
                      <circle
                        cx={152}
                        cy={152}
                        r={142}
                        fill="none"
                        pathLength={1000}
                      />
                      <path
                        d="M 90 224 V 80 H 115 C 129 80, 140 96, 140 116 C 140 136, 129 152, 115 152 H 105 M 214 116 C 214 96, 201 80, 187 80 C 173 80, 160 96, 160 116 C 160 136, 173 152, 187 152 C 201 152, 214 168, 214 188 C 214 208, 201 224, 187 224 H 120"
                        fill="none"
                        pathLength={1000}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col border-r border-slate-200 dark:border-zinc-800/80">
                <div className="h-10 sm:h-14 relative overflow-hidden bg-transparent w-full">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(315deg,#e2e8f0,#e2e8f0_1px,transparent_0,transparent_50%)] dark:bg-[repeating-linear-gradient(315deg,#27272a,#27272a_1px,transparent_0,transparent_50%)] bg-[length:10px_10px] opacity-80 dark:opacity-[0.56]" />
                </div>

                <div className="border-t border-slate-200 dark:border-zinc-800/80 py-2 sm:py-3.5 pl-4 sm:pl-6 flex items-center bg-transparent flex-1">
                  <h1 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                    {t('common.name')}
                  </h1>
                </div>

                <div className="border-t border-slate-200 dark:border-zinc-800/80 h-10 sm:h-12 py-1 pl-4 sm:pl-6 flex items-center bg-transparent">
                  <div className="h-6 sm:h-7 overflow-hidden relative w-full flex items-center">
                    <div
                      key={currentRoleIndex}
                      className="animate-slide-up-fade text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-mono flex items-center gap-1.5"
                    >
                      {roles[currentRoleIndex]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full h-8 sm:h-10 pointer-events-none shrink-0 z-0">
              <Separator className="!max-w-none !px-0 !border-x-0 !mx-0" />
            </div>

            <div className="flex w-full relative overflow-visible">
              <div className="w-[112px] sm:w-[180px] shrink-0 px-2 sm:px-4 pb-2 sm:pb-4 flex flex-col items-center justify-end bg-transparent relative z-10 min-h-[140px]">
                <div className="absolute top-[-8px] sm:top-[-10px] bottom-0 right-0 w-px bg-slate-200 dark:bg-zinc-800/80 pointer-events-none" />

                <div className="absolute right-2.5 sm:right-4 bottom-4 sm:bottom-6 opacity-30 hover:opacity-100 transition-opacity duration-500 select-none z-20">
                  <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    <span className="font-mono text-[8px] sm:text-[12px] tracking-[0.2em] text-slate-500 dark:text-zinc-400 uppercase font-bold whitespace-nowrap">
                      Frontend Developer
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col bg-transparent relative">
                <div className="absolute top-[-8px] sm:top-[-10px] bottom-0 right-0 w-px bg-slate-200 dark:bg-zinc-800/80 pointer-events-none" />
                <div className="p-3 sm:p-4.5 space-y-2.5 bg-transparent relative z-10 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3.5 font-mono text-[11px] sm:text-sm text-slate-700 dark:text-zinc-300">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-800">
                      <MapPin className="size-3.5 text-slate-500 dark:text-zinc-400" />
                    </div>
                    <span className="font-sans font-medium text-balance">{t('contact.addressText')}</span>
                  </div>

                  <div className="flex items-center gap-3.5 font-mono text-[11px] sm:text-sm text-slate-700 dark:text-zinc-300">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-800">
                      <Mail className="size-3.5 text-slate-500 dark:text-zinc-400" />
                    </div>
                    <a href="mailto:mnt250723@gmail.com" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-mono underline-offset-4 hover:underline">
                      mnt250723@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3.5 font-mono text-[11px] sm:text-sm text-slate-700 dark:text-zinc-300">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-800">
                      <Globe className="size-3.5 text-slate-500 dark:text-zinc-400" />
                    </div>
                    <a href="https://mnt.id.vn" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-mono underline-offset-4 hover:underline">
                      mnt.id.vn
                    </a>
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-zinc-800/80 p-2.5 sm:p-3.5 flex items-center gap-3 bg-transparent">
                  <a
                    href="https://www.facebook.com/phamson.25723"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all hover:scale-105"
                    title="Facebook"
                  >
                    <FaFacebookF className="size-4" />
                  </a>
                  <a
                    href="https://github.com/mnt25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all hover:scale-105"
                    title="GitHub"
                  >
                    <FaGithub className="size-4" />
                  </a>
                  <a
                    href="https://t.me/pvson03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-cyan-400 transition-all hover:scale-105"
                    title="Telegram"
                  >
                    <FaTelegramPlane className="size-4" />
                  </a>
                  <a
                    href="https://zalo.me/0377309531"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all hover:scale-105"
                    title="Zalo"
                  >
                    <SiZalo className="size-4" />
                  </a>
                  <a
                    href={isCVEnabled ? cvLink : undefined}
                    download={isCVEnabled ? true : undefined}
                    target={isCVEnabled ? "_blank" : undefined}
                    rel={isCVEnabled ? "noopener noreferrer" : undefined}
                    onClick={handleDownload}
                    className={`flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all hover:scale-105 ${!isCVEnabled ? "opacity-75 cursor-not-allowed" : ""}`}
                    title={t('hero.downloadCV')}
                  >
                    <Download className="size-4" />
                    <span className="ml-2 text-xs sm:text-sm">{t('hero.downloadCV')}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300vw] h-px bg-slate-200/80 dark:bg-zinc-800/80 pointer-events-none" />
          </div>
        </Reveal>
      </div>

      <Dialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title={t('common.notice')}
      >
        <div className="space-y-5">
          <div className="p-4 bg-slate-50 dark:bg-[#030304]/60 border border-slate-200/50 dark:border-zinc-900/60 relative font-mono text-xs md:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line rounded-none">
            {/* Các chi tiết/đường kẻ góc mang phong cách bảng mạch kỹ thuật (Cyberpunk brackets) */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-350 dark:border-zinc-700" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-slate-350 dark:border-zinc-700" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-slate-350 dark:border-zinc-700" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-slate-350 dark:border-zinc-700" />
            {t('hero.cvDisabled')}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => setShowDialog(false)}
              className="px-5 py-2 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-cyan-400 border border-slate-200 dark:border-cyan-500/20 hover:border-blue-500 dark:hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] font-mono text-[11px] uppercase tracking-wider font-bold transition-all duration-300 rounded-none"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default Hero;
