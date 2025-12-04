import React from "react";
import {
  X,
  LayoutDashboard,
  FileText,
  FolderKanban,
  MessageSquare,
  LogOut,
} from "lucide-react";
import SidebarButton from "./SidebarButton";

interface Props {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expire");
    window.location.href = "/";
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-45 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 w-64 h-screen
          bg-white dark:bg-slate-900 
          border-r border-slate-200 dark:border-slate-800
          flex flex-col justify-between
          z-50 transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center px-6 justify-between border-b border-slate-200 dark:border-slate-800">
          <span className="text-xl font-bold text-blue-600">Admin Panel</span>
          <button
            className="md:hidden text-slate-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarButton
            icon={<LayoutDashboard className="w-5 h-5" />}
            text="Tổng quan"
            active={activeTab === "dashboard"}
            onClick={() => {
              setActiveTab("dashboard");
              setSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FileText className="w-5 h-5" />}
            text="Quản lý CV"
            active={activeTab === "cv"}
            onClick={() => {
              setActiveTab("cv");
              setSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FolderKanban className="w-5 h-5" />}
            text="Dự án"
            active={activeTab === "projects"}
            onClick={() => {
              setActiveTab("projects");
              setSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<MessageSquare className="w-5 h-5" />}
            text="Tin nhắn"
            active={activeTab === "messages"}
            onClick={() => {
              setActiveTab("messages");
              setSidebarOpen(false);
            }}
          />
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
