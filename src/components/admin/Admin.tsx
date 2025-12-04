import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import CVManager from "./CVManager";
import ProjectManager from "./ProjectManager.tsx";
import MessageManager from "./MessageManager";
import { Menu } from "lucide-react";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "cv" | "projects" | "messages"
  >("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expire = localStorage.getItem("token_expire");

    if (!token || !expire || Date.now() > Number(expire)) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_expire");
      navigate("/");
    }
  }, []);

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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex">

      {/* MOBILE HEADER */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 h-16 flex items-center justify-between px-4 shadow z-50">
        <span className="text-lg font-bold text-blue-600">Admin Panel</span>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-7 h-7 text-slate-700 dark:text-slate-300" />
        </button>
      </header>

      {/* SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-8 mt-16 md:mt-0">
        {renderContent()}
      </main>
    </div>
  );
};

export default Admin;
