import React, { useEffect, useState } from 'react';
import { Download, MapPin, Check, Copy, ArrowUpRight, Sparkles } from 'lucide-react';
import { FaFacebookF, FaTelegramPlane, FaGithub } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { useLanguage } from "../../context/LanguageContext";
import { Reveal } from "../ui/Reveal";
import { Dialog } from "../ui/Dialog";
import SnowEffect from "../ui/SnowEffect";
import { api } from '../../../server/api';

const ROLES_VI = [
  "Xin chào!",
  "Tôi là Phạm Sơn",
  "Tôi là một Software & AI Engineer",
];

const ROLES_EN = [
  "Hello there!",
  "My name is Pham Son",
  "I'm a Software & AI Engineer",
];

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [cvLink, setCvLink] = useState<string>('#');
  const [isCVEnabled, setIsCVEnabled] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Typewriter states
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  const roles = language === "vi" ? ROLES_VI : ROLES_EN;

  // Reset typewriter when language changes
  useEffect(() => {
    setText("");
    setIsDeleting(false);
    setLoopIndex(0);
  }, [language]);

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const status = await api.getAccountStatus();
        setIsCVEnabled(status.enabled);

        if (status.enabled) {
          const cvData = await api.getCVLink();
          setCvLink(cvData.link);
        } else {
          setCvLink("#");
        }
      } catch {
        setCvLink("#");
      }
    };
    fetchCVData();
  }, []);

  // Smooth lightweight typewriter effect
  useEffect(() => {
    const currentRole = roles[loopIndex % roles.length];
    let speed = isDeleting ? 30 : 65;

    if (!isDeleting && text === currentRole) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopIndex((prev) => prev + 1);
      return;
    }

    const timer = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentRole.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopIndex, roles]);

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isCVEnabled) {
      e.preventDefault();
      setShowDialog(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mnt250723@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center pt-28 sm:pt-32 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Snowfall scoped strictly across the full 1st viewport */}
      <SnowEffect />

      {/* Ambient center spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-cyan-500/[0.04] dark:bg-cyan-500/[0.07] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10">
        {/* Display Typography Headline: Welcome to my portfolio! */}
        <Reveal>
          <div className="relative mb-6 w-full flex justify-center">
            <h1 className="font-instrument text-3xl sm:text-5xl md:text-6xl lg:text-7xl italic font-normal tracking-tight text-zinc-950 dark:text-white whitespace-nowrap leading-tight text-center">
              <span>{t('hero.headline.part1')}</span>{" "}
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{t('hero.headline.part2')}</span>
            </h1>
          </div>
        </Reveal>

        {/* Typewriter Dynamic Role Badge (Image 1 Style) */}
        <Reveal>
          <div className="h-11 mb-10 flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 border border-black/10 dark:border-white/15 font-mono text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-semibold shadow-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-cyan-500 shrink-0" />
              <span>{text}</span>
              <span className="w-1.5 h-4 bg-cyan-500 animate-pulse ml-0.5 rounded-xs" />
            </div>
          </div>
        </Reveal>

        {/* Action Dock: Download CV + Copy Email (Image 2 Top Row) */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
            {/* Download CV */}
            <a
              href={isCVEnabled ? cvLink : undefined}
              download={isCVEnabled ? true : undefined}
              target={isCVEnabled ? "_blank" : undefined}
              rel={isCVEnabled ? "noopener noreferrer" : undefined}
              onClick={handleDownload}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono font-semibold transition-all duration-200 ${
                isCVEnabled
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg shadow-black/10 dark:shadow-white/5 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed opacity-75"
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{t('hero.downloadCV')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            {/* 1-Click Copy Email */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-mono font-medium bg-white dark:bg-zinc-900/90 border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 hover:border-cyan-500/40 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-sm transition-all duration-200 active:scale-[0.98]"
              title="Sao chép địa chỉ Email"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">{language === 'vi' ? 'Đã sao chép email!' : 'Email copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 opacity-60" />
                  <span>mnt250723@gmail.com</span>
                </>
              )}
            </button>
          </div>
        </Reveal>

        {/* Location & Social Unified Pill Dock (Image 2 Bottom Row) */}
        <Reveal>
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 px-5 py-2.5 rounded-full bg-zinc-50/80 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-md text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-500" />
              <span>{t('contact.addressText')}</span>
            </div>

            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>

            {/* Social Icons Group */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/ps257"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all hover:scale-115"
                title="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/pvson03"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-telegram transition-all hover:scale-115"
                title="Telegram"
              >
                <FaTelegramPlane className="w-4 h-4" />
              </a>
              <a
                href="https://zalo.me/0377309531"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-blue-500 transition-all hover:scale-115"
                title="Zalo"
              >
                <SiZalo className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/phamson.25723"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-facebook transition-all hover:scale-115"
                title="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* CV Locked Modal Dialog */}
      <Dialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title={t('common.notice')}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/10 font-mono text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
            {t('hero.cvDisabled')}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setShowDialog(false)}
              className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-mono text-xs uppercase tracking-wider font-semibold transition-all"
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
