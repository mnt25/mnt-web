import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import CVManager from "./CVManager";
import ProjectManager from "./ProjectManager";
import MessageManager from "./MessageManager";
import { Menu } from "lucide-react";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "cv" | "projects" | "messages"
  >("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expire = localStorage.getItem("token_expire");

    if (!token || !expire || Date.now() > Number(expire)) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_expire");
      navigate("/pslogin");
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} />;
      case "cv":
        return <CVManager />;
      case "projects":
        return <ProjectManager />;
      case "messages":
        return <MessageManager />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex relative overflow-hidden font-sans select-none transition-colors duration-300">
      {/* MOBILE HEADER */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md h-16 flex items-center justify-between px-6 border-b border-black/10 dark:border-white/10 z-40 transition-colors duration-300">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="font-mono text-sm tracking-tight font-bold text-zinc-900 dark:text-white">
            ADMIN // CONSOLE
          </span>
        </div>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 border border-black/10 dark:border-white/10 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
        >
          <Menu className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
        </button>
      </header>

      {/* SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* MAIN CONTENT AREA */}
      <main className={`flex-1 p-6 md:p-10 mt-16 md:mt-0 z-10 flex flex-col relative overflow-y-auto max-h-screen transition-all duration-300`}>
        <div className="flex-1 w-full max-w-7xl mx-auto py-2">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
