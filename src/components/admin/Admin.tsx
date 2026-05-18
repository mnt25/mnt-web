import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import CVManager from "./CVManager";
import AccountManager from "./AccountManager";
import ProjectManager from "./ProjectManager";
import MessageManager from "./MessageManager";
import { Menu } from "lucide-react";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "cv" | "projects" | "messages" | "account"
  >("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expire = localStorage.getItem("token_expire");

    if (!token || !expire || Date.now() > Number(expire)) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_expire");
      navigate("/login");
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
      case "account":
        return <AccountManager />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex relative overflow-hidden font-sans select-none">
      {/* High-tech Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      
      {/* Subtle Glowing Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />

      {/* MOBILE HEADER */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-[#09090b]/80 backdrop-blur-md h-16 flex items-center justify-between px-6 border-b border-zinc-800/80 z-40">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-blue-500 animate-pulse rounded-full" />
          <span className="font-mono text-sm tracking-wider font-bold uppercase text-zinc-200">
            NEXUS // CONSOLE
          </span>
        </div>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors"
        >
          <Menu className="w-5 h-5 text-zinc-300" />
        </button>
      </header>

      {/* SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 mt-16 md:mt-0 z-10 flex flex-col relative overflow-y-auto max-h-screen">
        {/* Decorative corner brackets for main dashboard frame */}
        <div className="absolute top-10 left-10 w-3 h-3 border-t-2 border-l-2 border-zinc-800 pointer-events-none hidden md:block" />
        <div className="absolute top-10 right-10 w-3 h-3 border-t-2 border-r-2 border-zinc-800 pointer-events-none hidden md:block" />
        <div className="absolute bottom-10 left-10 w-3 h-3 border-b-2 border-l-2 border-zinc-800 pointer-events-none hidden md:block" />
        <div className="absolute bottom-10 right-10 w-3 h-3 border-b-2 border-r-2 border-zinc-800 pointer-events-none hidden md:block" />

        <div className="flex-1 w-full max-w-7xl mx-auto py-2">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
