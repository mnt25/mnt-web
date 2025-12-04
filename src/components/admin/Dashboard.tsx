import { useEffect, useState } from "react";
import { FolderKanban, MessageSquare } from "lucide-react";
import { api } from "../../../server/api";

const Dashboard = ({
  setActiveTab,
}: {
  setActiveTab: (tab: any) => void;
}) => {
  const [stats, setStats] = useState({ projects: 0, messages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const projects = await api.getProjects();
      const messages = await api.getMessages();
      setStats({ projects: projects.length, messages: messages.length });
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Tổng quan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => setActiveTab("projects")}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 dark:text-slate-400">Tổng Dự án</h3>
            <FolderKanban className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {stats.projects}
          </p>
        </div>

        <div
          onClick={() => setActiveTab("messages")}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 dark:text-slate-400">Tin nhắn mới</h3>
            <MessageSquare className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {stats.messages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
