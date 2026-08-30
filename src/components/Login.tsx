import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../server/api";
import {
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import SnowEffect from "./ui/SnowEffect";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expire = localStorage.getItem("token_expire");

    if (token && expire && Date.now() < Number(expire)) {
      navigate("/psmanager");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await api.login(username, password);

      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "token_expire",
          (Date.now() + 12 * 60 * 60 * 1000).toString()
        );

        navigate("/psmanager");
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không chính xác.");
      }
    } catch {
      setError("Đã xảy ra lỗi kết nối với máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#09090b] px-4 py-12 relative overflow-hidden select-none transition-colors duration-300">
      {/* Snowfall scoped strictly across the viewport */}
      <SnowEffect />

      {/* Ambient center spotlight matching homepage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[340px] bg-cyan-500/[0.04] dark:bg-cyan-500/[0.08] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Bar: Return to Homepage */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-cyan-500/40 shadow-xs backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về trang chủ</span>
        </button>
      </div>

      {/* Main Glassmorphism Authentication Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white/90 dark:bg-zinc-900/80 border border-black/[0.08] dark:border-white/[0.1] shadow-2xl shadow-black/5 dark:shadow-black/40 overflow-hidden backdrop-blur-2xl z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Neon Brand Accent Header Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 shrink-0" />

        <div className="p-7 sm:p-9">
          {/* Header Title Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-lg shadow-cyan-500/10">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border border-zinc-50 dark:border-zinc-900">
                <Sparkles className="w-3 h-3 text-cyan-400 dark:text-cyan-600" />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Cổng Quản Trị Hệ Thống
            </h2>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
              Xác thực quyền quản lý dự án & CV cá nhân
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">
                Tài khoản quản trị
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-xs sm:text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                  placeholder="Nhập tên tài khoản"
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 font-medium">
                  Mật khẩu bảo mật
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-xs sm:text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-start gap-2 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-mono font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-black/10 dark:shadow-white/5 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                    <span>Đang xác thực hệ thống...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng Nhập Quản Trị</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-5 border-t border-black/5 dark:border-white/5 text-center">
            <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
              Hệ thống bảo mật • Phạm Sơn Portfolio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
