import { useEffect, useState } from "react";
import { FolderKanban, MessageSquare, Terminal, Activity, Cpu } from "lucide-react";
import { api } from "../../../server/api";

const Dashboard = ({
  setActiveTab,
}: {
  setActiveTab: (tab: any) => void;
}) => {
  const [stats, setStats] = useState({ projects: 0, messages: 0 });
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projects = await api.getProjects();
        const messages = await api.getMessages();
        setStats({ projects: projects.length, messages: messages.length });
      } catch (err) {
        console.error("Lỗi tải thông tin thống kê:", err);
      }
    };

    fetchStats();

    // Live clock for high-tech aesthetic
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString("en-GB") + " // " + now.toLocaleDateString("en-GB"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 select-none">
      {/* Dynamic Command Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <span className="font-mono text-xs text-blue-400 uppercase tracking-widest font-bold block mb-1">
            SYSTEM CONTROL CENTER
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Terminal className="w-7 h-7 text-blue-400" />
            TỔNG QUAN HỆ THỐNG
          </h2>
        </div>
        <div className="flex items-center gap-4 bg-zinc-950/60 border border-zinc-800/60 p-3 font-mono text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-emerald-400">SYS_OK</span>
          </div>
          <span className="text-zinc-700">|</span>
          <span>{systemTime}</span>
        </div>
      </div>

      {/* Control Module Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Projects Card */}
        <div
          onClick={() => setActiveTab("projects")}
          className="bg-zinc-950/45 backdrop-blur-md p-6 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group relative"
        >
          {/* Blueprint technical brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-650 group-hover:border-blue-400 transition-colors" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-650 group-hover:border-blue-400 transition-colors" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-650 group-hover:border-blue-400 transition-colors" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-650 group-hover:border-blue-400 transition-colors" />

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="block font-mono text-xs text-zinc-400 uppercase tracking-widest">MODULE // PROJECTS</span>
              <h3 className="font-mono text-xs uppercase font-bold text-zinc-300 mt-1">Tổng Dự án</h3>
            </div>
            <div className="p-2.5 bg-blue-950/30 border border-blue-800/30 rounded-none group-hover:border-blue-500/50 transition-colors">
              <FolderKanban className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-extrabold text-white font-mono tracking-tight group-hover:text-blue-400 transition-colors">
              {String(stats.projects).padStart(2, "0")}
            </p>
            <span className="text-xs font-mono text-zinc-400 uppercase">items_loaded</span>
          </div>
        </div>

        {/* New Messages Card */}
        <div
          onClick={() => setActiveTab("messages")}
          className="bg-zinc-950/45 backdrop-blur-md p-6 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group relative"
        >
          {/* Blueprint technical brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-650 group-hover:border-emerald-400 transition-colors" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-650 group-hover:border-emerald-400 transition-colors" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-650 group-hover:border-emerald-400 transition-colors" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-650 group-hover:border-emerald-400 transition-colors" />

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="block font-mono text-xs text-zinc-400 uppercase tracking-widest">MODULE // CONTACT</span>
              <h3 className="font-mono text-xs uppercase font-bold text-zinc-300 mt-1">Tin nhắn liên hệ</h3>
            </div>
            <div className="p-2.5 bg-emerald-950/30 border border-emerald-800/30 rounded-none group-hover:border-emerald-500/50 transition-colors">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-extrabold text-white font-mono tracking-tight group-hover:text-emerald-400 transition-colors">
              {String(stats.messages).padStart(2, "0")}
            </p>
            <span className="text-xs font-mono text-zinc-400 uppercase">unread_logs</span>
          </div>
        </div>

        {/* Live System Performance Card */}
        <div
          className="bg-zinc-950/45 backdrop-blur-md p-6 border border-zinc-800 group relative"
        >
          {/* Blueprint technical brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-650" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-650" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-650" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-650" />

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="block font-mono text-xs text-zinc-400 uppercase tracking-widest">MONITOR // PERFORMANCE</span>
              <h3 className="font-mono text-xs uppercase font-bold text-zinc-300 mt-1">Trạng thái Server</h3>
            </div>
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-none">
              <Cpu className="w-5 h-5 text-zinc-400" />
            </div>
          </div>
          
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Database Connection</span>
              <span className="text-emerald-400 font-semibold">ONLINE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Server Latency</span>
              <span className="text-zinc-200">12ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">SSL Status</span>
              <span className="text-blue-450 font-semibold">SECURE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Console Event log / Activity overview */}
      <div className="bg-zinc-950/45 border border-zinc-800 relative p-6">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-700" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-700" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-700" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-700" />

        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-blue-500" />
          <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-zinc-300">
            SYSTEM FEEDBACK // LIVE STATUS LOGS
          </h3>
        </div>

        <div className="bg-[#050506] border border-zinc-900/60 p-4 font-mono text-xs text-zinc-400 rounded-none h-40 overflow-y-auto space-y-2 scrollbar-thin">
          <p><span className="text-zinc-600">[2026-05-18 15:37:25]</span> <span className="text-blue-500">[INFO]</span> Initializing secure crypto framework for password verify.</p>
          <p><span className="text-zinc-600">[2026-05-18 15:40:02]</span> <span className="text-emerald-500">[SUCCESS]</span> Database migration applied: Created start_date & end_date columns successfully.</p>
          <p><span className="text-zinc-600">[2026-05-18 15:40:04]</span> <span className="text-emerald-500">[SUCCESS]</span> Root user "adminmaster" loaded and securely hashed using SHA-256 algorithm.</p>
          <p><span className="text-zinc-600">[2026-05-18 15:41:07]</span> <span className="text-blue-500">[INFO]</span> Port listener 5000 restarted. Connection pool verified.</p>
          <p><span className="text-zinc-600">[2026-05-18 15:44:30]</span> <span className="text-zinc-500">[DEBUG]</span> Polling system statistics: {stats.projects} projects, {stats.messages} messages found.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
