import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../server/api";
import { Lock, Eye, EyeOff, User } from "lucide-react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expire = localStorage.getItem("token_expire");

    if (token && expire && Date.now() < Number(expire)) {
      navigate("/psmanager");
    }
  }, [navigate]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent transition-colors duration-300 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none dark:opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative bg-white/60 dark:bg-zinc-900/10 backdrop-blur-md p-8 w-full max-w-md border border-slate-200/80 dark:border-zinc-800/80 z-10">
        {/* Corner Grid Decorations */}
        <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-slate-400 dark:border-zinc-600 pointer-events-none" />
        <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-slate-400 dark:border-zinc-600 pointer-events-none" />
        <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-slate-400 dark:border-zinc-600 pointer-events-none" />
        <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-slate-400 dark:border-zinc-600 pointer-events-none" />

        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-full border border-slate-200 dark:border-zinc-800/80 flex items-center justify-center mb-3 shadow-inner bg-slate-100/50 dark:bg-zinc-900/50">
            <Lock className="h-5 w-5 text-slate-500 dark:text-zinc-400" />
          </div>
          <h2 className="text-xl font-bold tracking-wider uppercase font-mono text-slate-900 dark:text-white">
            ADMIN SYSTEM
          </h2>
          <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-zinc-500 uppercase mt-1">
            Sign in to continue
          </span>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-zinc-400 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-slate-900 dark:text-white font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors duration-200"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-zinc-400 mb-2">
              Password
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-slate-900 dark:text-white font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors duration-200"
                placeholder="••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300"
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
            <div className="text-red-500 font-mono text-[11px] text-center bg-red-100/50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/30 p-2.5">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-slate-900 dark:border-zinc-700 text-xs font-mono uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
