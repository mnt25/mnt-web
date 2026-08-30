import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import CVManager from "./CVManager";
import ProjectManager from "./ProjectManager";
import MessageManager from "./MessageManager";
import { Menu, ShieldCheck } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex relative overflow-hidden font-sans select-none transition-colors duration-200">
      {/* Optimized Ambient center spotlight using radial-gradient (Zero GPU layout/composite cost) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] pointer-events-none -z-10 opacity-70 dark:opacity-90"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(6,182,212,0.08) 0%, rgba(6,182,212,0.02) 45%, transparent 70%)",
        }}
      />

      {/* MOBILE HEADER */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md h-16 flex items-center justify-between px-5 border-b border-black/[0.06] dark:border-white/[0.08] z-40 transition-colors duration-200">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight text-zinc-950 dark:text-white">
            Admin Portal
          </span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse ml-1" />
        </div>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 border border-black/10 dark:border-white/10 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
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

      {/* MAIN CONTENT AREA - High-performance tab keeping (Instant 0ms switching without refetch lag) */}
      <main className="flex-1 p-4 sm:p-7 md:p-9 mt-16 md:mt-0 z-10 flex flex-col relative overflow-y-auto max-h-screen">
        <div className="flex-1 w-full max-w-6xl mx-auto py-1">
          <div className={activeTab === "dashboard" ? "block animate-in fade-in-50 duration-150" : "hidden"}>
            <Dashboard setActiveTab={setActiveTab} />
          </div>
          <div className={activeTab === "cv" ? "block animate-in fade-in-50 duration-150" : "hidden"}>
            <CVManager />
          </div>
          <div className={activeTab === "projects" ? "block animate-in fade-in-50 duration-150" : "hidden"}>
            <ProjectManager />
          </div>
          <div className={activeTab === "messages" ? "block animate-in fade-in-50 duration-150" : "hidden"}>
            <MessageManager />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
