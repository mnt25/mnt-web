import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../server/api";
import { Lock, Eye, EyeOff, User, ArrowLeft, Loader2 } from "lucide-react";

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
        setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    } catch {
      setError("Đã xảy ra lỗi kết nối với máy chủ!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#09090b] px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </button>

      <div className="relative bg-white dark:bg-zinc-900/80 backdrop-blur-xl p-8 sm:p-10 w-full max-w-md border border-black/[0.08] dark:border-white/[0.08] rounded-3xl shadow-xl shadow-black/5 dark:shadow-black/40 z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-cyan-500" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Admin Portal
          </h2>
          <span className="text-xs font-mono text-zinc-500 mt-1">
            Xác thực phiên làm việc quản trị
          </span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5">
              Tài khoản Admin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono"
                placeholder="Username"
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-mono font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isLoading ? "Đang xác thực..." : "Đăng nhập hệ thống"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
