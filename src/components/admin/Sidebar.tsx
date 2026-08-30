import React from "react";
import {
  X,
  LayoutDashboard,
  FileText,
  FolderKanban,
  MessageSquare,
  LogOut,
  Sun,
  Moon,
  PanelLeft,
  User,
  ArrowUpRight,
} from "lucide-react";
import SidebarButton from "./SidebarButton";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expire");
    window.location.href = "/pslogin";
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen
          bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl 
          border-r border-black/[0.06] dark:border-white/[0.08]
          flex flex-col justify-between
          z-50 transform transition-all duration-300 ease-in-out relative
          ${sidebarCollapsed ? "md:w-[72px]" : "md:w-64"} w-64
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER BRANDING & COLLAPSE BUTTON */}
        <div className="h-16 flex items-center px-4 justify-between border-b border-black/[0.06] dark:border-white/[0.08] relative">
          {!sidebarCollapsed ? (
            <>
              <div className="min-w-0 flex-1 pr-2">
                <span className="font-bold text-sm text-zinc-950 dark:text-white truncate block leading-tight">
                  Admin Portal
                </span>
                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 block">
                  Phạm Sơn Portfolio
                </span>
              </div>
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="hidden md:flex p-2 rounded-xl text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all cursor-pointer shrink-0"
                title="Thu gọn menu"
                aria-label="Thu gọn menu"
              >
                <PanelLeft className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="hidden md:flex p-2 rounded-xl text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all cursor-pointer"
                title="Mở rộng menu"
                aria-label="Mở rộng menu"
              >
                <PanelLeft className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile close button */}
          <button
            className="md:hidden p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOGGED IN USER PILL CARD */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-b border-black/[0.04] dark:border-white/[0.04]">
            <div className="flex items-center gap-3 p-2.5 bg-zinc-100/70 dark:bg-zinc-900/60 rounded-2xl border border-black/5 dark:border-white/5">
              <div className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 relative shrink-0">
                <User className="w-4 h-4" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white dark:border-zinc-900" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  Admin Master
                </span>
                <span className="block font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Đang hoạt động
                </span>
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION LIST */}
        <nav className={`flex-1 p-3 space-y-1 overflow-y-auto ${sidebarCollapsed ? "md:px-2" : ""}`}>
          <SidebarButton
            icon={<LayoutDashboard className="w-4 h-4" />}
            text="Tổng quan"
            active={activeTab === "dashboard"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setActiveTab("dashboard");
              setSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FileText className="w-4 h-4" />}
            text="Quản lý hồ sơ"
            active={activeTab === "cv"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setActiveTab("cv");
              setSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FolderKanban className="w-4 h-4" />}
            text="Dự án"
            active={activeTab === "projects"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setActiveTab("projects");
              setSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<MessageSquare className="w-4 h-4" />}
            text="Tin nhắn"
            active={activeTab === "messages"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setActiveTab("messages");
              setSidebarOpen(false);
            }}
          />

          <div className="pt-2 border-t border-black/5 dark:border-white/5 my-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center w-full transition-all duration-200 select-none outline-none group rounded-xl font-medium cursor-pointer text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60
                ${sidebarCollapsed ? "px-0 py-3 justify-center" : "px-3.5 py-2.5"}`}
              title="Mở trang chủ"
            >
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-500" />
              {!sidebarCollapsed && (
                <span className="ml-3 font-mono text-xs">
                  Xem Trang Chủ
                </span>
              )}
            </a>
          </div>
        </nav>

        {/* LOGOUT & THEME BUTTON CONTAINER */}
        <div className={`p-3.5 border-t border-black/[0.06] dark:border-white/[0.08] flex gap-2 ${sidebarCollapsed ? "md:flex-col md:items-center md:p-2" : ""}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center px-3.5 py-2.5 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 border border-rose-200/60 dark:border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 rounded-xl transition-all duration-200 font-mono text-xs font-semibold cursor-pointer
              ${sidebarCollapsed ? "md:w-10 md:h-10 md:flex-none" : "flex-1"}`}
            title="Đăng xuất"
            aria-label="Đăng xuất"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span className="ml-2">Đăng xuất</span>}
          </button>
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`flex items-center justify-center border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 rounded-xl transition-all duration-200 shrink-0 cursor-pointer
              ${sidebarCollapsed ? "md:w-10 md:h-10" : "w-10 h-10"}`}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Chuyển sang sáng" : "Chuyển sang tối"}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
