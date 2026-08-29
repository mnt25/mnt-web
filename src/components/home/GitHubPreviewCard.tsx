import React, { useState } from "react";
import { ExternalLink, Maximize2, Globe, X, Github, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const GitHubPreviewCard: React.FC = () => {
  const { language } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [iframeError, setIframeError] = useState<boolean>(false);

  const isVi = language === "vi";
  const targetUrl = "https://github.com/ps257";
  const displayUrl = "github.com/ps257";

  const handleOpenNewTab = () => {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="w-full space-y-2 select-none">
        {/* Web Preview Container */}
        <div className="bg-zinc-950 border border-black/10 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 flex flex-col">
          {/* Top Control & Navigation Bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs font-mono">
            {/* Left Badge Tab & URL */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-800/90 border border-white/10 text-cyan-400 font-semibold tracking-wider text-[11px] uppercase">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isVi ? "WEB XEM TRƯỚC" : "WEB PREVIEW"}</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-300 lowercase font-normal">{displayUrl}</span>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={handleOpenNewTab}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-all text-[11px] border border-white/5 active:scale-95"
                title={isVi ? "Mở trang web trong tab mới" : "Open site in new tab"}
              >
                <span>{isVi ? "Mở trang" : "Open site"}</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-all text-[11px] border border-white/5 active:scale-95"
                title={isVi ? "Xem toàn màn hình" : "Fullscreen"}
              >
                <Maximize2 className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline">{isVi ? "Toàn màn hình" : "Fullscreen"}</span>
              </button>
            </div>
          </div>

          {/* Web Preview Viewport Area */}
          <div className="relative w-full h-[360px] sm:h-[400px] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
            {iframeError ? (
              <div className="p-6 text-center space-y-4 max-w-sm flex flex-col items-center">
                <div className="p-3 rounded-full bg-zinc-900 border border-cyan-500/20 text-cyan-400">
                  <Github className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-zinc-200 font-semibold text-sm">
                    {isVi ? "Trang web xem trước GitHub" : "GitHub Web Preview"}
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {isVi
                      ? "GitHub hạn chế hiển thị trực tiếp trong khung nhúng. Bạn có thể mở trực tiếp profile ps257 trên GitHub."
                      : "GitHub restricts direct iframe embedding. You can open the ps257 profile directly on GitHub."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenNewTab}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <Github className="w-4 h-4" />
                  <span>{isVi ? "Truy cập github.com/ps257" : "Visit github.com/ps257"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <iframe
                src={targetUrl}
                title="Web Preview GitHub"
                className="w-full h-full border-0 rounded-b-xl"
                loading="lazy"
                onError={() => setIframeError(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Interactive Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-2xl flex flex-col p-2 sm:p-6 animate-in fade-in duration-200">
          {/* Top Bar inside Fullscreen */}
          <div className="flex items-center justify-between pb-3 px-2 text-xs font-mono text-white select-none">
            <div className="flex items-center gap-2 font-semibold text-cyan-400">
              <Globe className="w-4 h-4" />
              <span>{isVi ? "XEM TRƯỚC TRANG WEB TOÀN MÀN HÌNH" : "FULLSCREEN WEB PREVIEW"}</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-300 lowercase font-normal">{displayUrl}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenNewTab}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-all text-xs border border-white/10"
              >
                <span>{isVi ? "Mở trong tab mới" : "Open in new tab"}</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-500/80 text-white transition-all border border-white/10"
                title={isVi ? "Đóng" : "Close"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fullscreen Web Viewport Container */}
          <div className="flex-1 w-full bg-zinc-950 rounded-xl overflow-hidden border border-white/10 relative">
            <iframe
              src={targetUrl}
              title="Fullscreen Web Preview"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GitHubPreviewCard;
