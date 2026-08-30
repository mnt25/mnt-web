import { useEffect, useState } from "react";
import {
  FolderKanban,
  MessageSquare,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { api } from "../../../server/api";
import AdminSkeletonLoader from "./AdminSkeletonLoader";

const Dashboard = ({
  setActiveTab,
}: {
  setActiveTab: (tab: any) => void;
}) => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, isCVEnabled: true });
  const [systemTime, setSystemTime] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, messages, cvStatus] = await Promise.all([
          api.getProjects(),
          api.getMessages(),
          api.getAccountStatus(),
        ]);
        setStats({
          projects: projects.length,
          messages: messages.length,
          isCVEnabled: cvStatus.enabled,
        });
      } catch (err) {
        console.error("Lỗi tải thông tin thống kê:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    const updateTime = () => {
      const now = new Date();
      setSystemTime(
        now.toLocaleTimeString("vi-VN") + " • " + now.toLocaleDateString("vi-VN")
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <AdminSkeletonLoader
        title="Đang"
        italicWord="nạp"
        endWord="hệ thống"
        subtitle="Đang chạy mực qua máy in — từng lớp màu một, kiên nhẫn nhé!"
        cardsCount={3}
      />
    );
  }

  return (
    <div className="space-y-8 select-none font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BẢNG ĐIỀU KHIỂN QUẢN TRỊ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Tổng Quan Hệ Thống
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 mt-1">
            Quản lý nội dung danh mục dự án, hồ sơ CV và hộp thư liên hệ
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-zinc-900/80 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-zinc-600 dark:text-zinc-300 shadow-xs">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hệ Thống Trực Tuyến</span>
          </div>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Clock className="w-3.5 h-3.5 text-cyan-500" />
            <span>{systemTime}</span>
          </div>
        </div>
      </div>

      {/* 3 Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Total Projects Card */}
        <div
          onClick={() => setActiveTab("projects")}
          className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-cyan-500 dark:hover:border-cyan-400 hover:ring-1 hover:ring-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <FolderKanban className="w-6 h-6" />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              <span>Quản lý</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
              DỰ ÁN ĐANG HIỂN THỊ
            </span>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {String(stats.projects).padStart(2, "0")}
              </p>
              <span className="text-xs font-mono text-zinc-400">dự án</span>
            </div>
          </div>
        </div>

        {/* Messages Card */}
        <div
          onClick={() => setActiveTab("messages")}
          className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-emerald-500 dark:hover:border-emerald-400 hover:ring-1 hover:ring-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              <span>Hộp thư</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
              TIN NHẮN ĐÃ NHẬN
            </span>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {String(stats.messages).padStart(2, "0")}
              </p>
              <span className="text-xs font-mono text-zinc-400">tin nhắn</span>
            </div>
          </div>
        </div>

        {/* CV Status Card */}
        <div
          onClick={() => setActiveTab("cv")}
          className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-blue-500 dark:hover:border-blue-400 hover:ring-1 hover:ring-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <span>Cấu hình</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
              TRẠNG THÁI XEM CV
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                  stats.isCVEnabled
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    stats.isCVEnabled ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {stats.isCVEnabled ? "Đang Bật (Live)" : "Đang Khóa (Notice)"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500" />

        <div className="space-y-1.5 max-w-xl">
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
            Trung Tâm Quản Lý Portfolio Cá Nhân
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono">
            Mọi thay đổi về dự án, liên kết Google Drive CV hay kiểm tra tin nhắn khách gửi đều được đồng bộ thời gian thực với website chính.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab("projects")}
            className="px-5 py-2.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-mono font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            + Thêm Dự Án Mới
          </button>
          <button
            onClick={() => setActiveTab("cv")}
            className="px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-mono font-medium transition-all cursor-pointer"
          >
            Đổi Link CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
