import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../server/api";
import { Lock, Eye, EyeOff, User, Terminal } from "lucide-react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Tự động kiểm tra token phiên làm việc hiện tại và chuyển hướng sang trang quản trị nếu còn hạn
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
        setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi kết nối với máy chủ!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030303] transition-colors duration-300 relative overflow-hidden">
      {/* High-tech Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

    

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none dark:opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative bg-white/80 dark:bg-[#09090b]/40 backdrop-blur-md p-8 w-full max-w-md border border-slate-200/80 dark:border-zinc-800/85 z-10 shadow-xl dark:shadow-none">
        {/* Họa tiết trang trí góc vuông phong cách kỹ thuật */}
        <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-blue-600 dark:border-blue-500 pointer-events-none" />
        <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-blue-600 dark:border-blue-500 pointer-events-none" />
        <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-blue-600 dark:border-blue-500 pointer-events-none" />
        <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-blue-600 dark:border-blue-500 pointer-events-none" />

        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 rounded-full border border-slate-200 dark:border-zinc-800 flex items-center justify-center mb-4 shadow-sm bg-slate-50 dark:bg-zinc-900/30 relative overflow-hidden group">
            {/* Spinning scanner element */}
            <div className="absolute inset-0.5 rounded-full border border-dashed border-blue-500/30 dark:border-cyan-500/20 group-hover:rotate-180 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-blue-500/5 dark:bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Lock className="h-6 w-6 text-blue-600 dark:text-cyan-400 relative z-10 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-500" />
            <h2 className="text-xl font-mono font-black tracking-widest uppercase text-slate-800 dark:text-zinc-100">
              PS // LOGIN
            </h2>
          </div>
          <span className="text-[9px] font-mono tracking-[0.3em] text-slate-400 dark:text-zinc-500 uppercase mt-2">
            SYSTEM ACCESS REQUIRED
          </span>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative pb-5">
            <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-500 dark:text-zinc-400 mb-2">
              Console Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-[#050506]/60 text-slate-900 dark:text-white font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 transition-all duration-300"
                placeholder="Enter root ID"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="relative pb-5">
            <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-500 dark:text-zinc-400 mb-2">
              Terminal Password
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-[#050506]/60 text-slate-900 dark:text-white font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 transition-all duration-300"
                placeholder="••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 font-mono text-[10px] text-center bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/30 p-3 leading-relaxed relative">
              <div className="absolute top-0 left-0 w-1 h-1 bg-red-600 dark:bg-red-500" />
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-red-600 dark:bg-red-500" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-blue-600 dark:border-blue-500/30 text-xs font-mono uppercase tracking-widest text-white dark:text-cyan-400 bg-blue-600 dark:bg-blue-950/20 hover:bg-blue-700 dark:hover:bg-blue-500/25 transition-all duration-300 relative overflow-hidden group shadow-lg shadow-blue-600/10 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Tech line hover effect */}
            <span className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            {isLoading ? "AUTHORIZING..." : "Sign In // ACCESS"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
