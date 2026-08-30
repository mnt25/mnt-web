import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ExternalLink,
  Download,
  Maximize2,
  Minimize2,
  FileText,
  Loader2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl?: string;
  isCVEnabled?: boolean;
}

// Convert Google Drive links to embeddable preview links
export function formatDrivePreviewUrl(url: string): string {
  if (!url || url === "#" || url.trim() === "") return "";

  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }

  const idQueryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idQueryMatch && idQueryMatch[1]) {
    return `https://drive.google.com/file/d/${idQueryMatch[1]}/preview`;
  }

  return url;
}

export const CVModal: React.FC<CVModalProps> = ({
  isOpen,
  onClose,
  cvUrl = "",
  isCVEnabled = true,
}) => {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const previewUrl = useMemo(() => formatDrivePreviewUrl(cvUrl), [cvUrl]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mnt250723@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 select-none">
      {/* High-Performance Lightweight Backdrop (No heavy blur) */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className={`relative w-full flex flex-col rounded-2xl bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden z-10 ${
          isFullscreen
            ? "fixed inset-2 sm:inset-3 max-w-none max-h-none h-[calc(100vh-1rem)]"
            : "max-w-5xl h-[86vh] max-h-[850px]"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Neon Brand Accent Header Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 shrink-0" />

        {/* Compact & Clean Modal Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 border-b border-black/5 dark:border-white/10 shrink-0 bg-zinc-50 dark:bg-zinc-900">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-950 dark:text-white truncate">
              {isVi ? "CV — Phạm Sơn" : "CV — Pham Son"}
            </h3>
          </div>

          {/* Compact Header Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isCVEnabled && cvUrl && cvUrl !== "#" && (
              <>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-black/5 dark:border-white/10"
                  title={isVi ? "Mở Google Drive" : "Open Drive"}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isVi ? "Drive" : "Drive"}</span>
                </a>

                <a
                  href={cvUrl}
                  download="Pham_Van_Son_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                  title={isVi ? "Tải xuống CV" : "Download CV"}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isVi ? "Tải về" : "Download"}</span>
                </a>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors hidden sm:inline-flex"
                  title={isFullscreen ? (isVi ? "Thu nhỏ" : "Exit Fullscreen") : (isVi ? "Toàn màn hình" : "Fullscreen")}
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              title={isVi ? "Đóng" : "Close"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 relative bg-zinc-950 min-h-0 overflow-hidden flex flex-col items-center justify-center">
          {!isCVEnabled ? (
            /* CV Disabled Notice Panel */
            <div className="max-w-md w-full mx-auto p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-base font-bold text-zinc-950 dark:text-white mb-1.5">
                  {isVi ? "CV Đang Được Cập Nhật" : "CV Temporarily Unavailable"}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono whitespace-pre-line">
                  {t("hero.cvDisabled")}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <button
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{isVi ? "Đã sao chép!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>mnt250723@gmail.com</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 rounded-full text-xs font-mono font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all"
                >
                  {isVi ? "Đóng" : "Close"}
                </button>
              </div>
            </div>
          ) : previewUrl ? (
            /* Live Google Drive Preview Iframe (Lightweight & Smooth) */
            <div className="relative w-full h-full bg-zinc-950">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 z-10 gap-2.5">
                  <Loader2 className="w-7 h-7 text-cyan-500 animate-spin" />
                  <p className="text-xs font-mono text-zinc-400">
                    {isVi ? "Đang tải CV..." : "Loading CV..."}
                  </p>
                </div>
              )}

              <iframe
                src={previewUrl}
                title="CV Preview"
                className="w-full h-full border-0 bg-white"
                allow="autoplay"
                loading="lazy"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-500 font-mono text-sm">
              {isVi ? "Chưa cấu hình đường dẫn CV." : "No CV link configured."}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
