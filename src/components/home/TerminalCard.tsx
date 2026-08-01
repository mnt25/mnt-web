import React, { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, Sparkles, User, Code, Briefcase, Mail, ShieldCheck, Trash2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface HistoryItem {
  id: string;
  command?: string;
  output?: React.ReactNode;
}

const birthYear = 2003;
const age = new Date().getFullYear() - birthYear;

export const TerminalCard: React.FC = () => {
  const { language, t } = useLanguage();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isVi = language === "vi";

  // Initial welcome message
  useEffect(() => {
    setHistory([
      {
        id: "welcome",
        output: (
          <div className="space-y-1 text-xs sm:text-sm text-slate-300">
            <p className="text-blue-400 font-semibold">
              Pham Son CLI [Version 2.5.0] - (c) {new Date().getFullYear()} MNT Dev
            </p>
            <p className="text-slate-400">
              {isVi 
                ? "Gõ lệnh hoặc bấm nút gợi ý bên dưới để khám phá thông tin." 
                : "Type a command or click suggestion chips below to explore info."}
            </p>
          </div>
        ),
      },
    ]);
  }, [language]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);

    let outputNode: React.ReactNode = null;

    if (lower === "clear" || lower === "cls") {
      setHistory([]);
      setInput("");
      return;
    } else if (lower === "help" || lower === "?" || lower === "goi y" || lower === "gợi ý") {
      outputNode = (
        <div className="space-y-1.5 py-1 text-xs sm:text-sm">
          <p className="text-yellow-400 font-medium">
            {isVi ? "Các lệnh khả dụng:" : "Available commands:"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2 text-slate-300">
            <div>
              <span className="text-green-400 font-mono font-bold">whoami</span>
              <span className="text-slate-400 text-xs ml-2">
                {isVi ? "— Giới thiệu bản thân" : "— Developer profile"}
              </span>
            </div>
            <div>
              <span className="text-green-400 font-mono font-bold">skills</span>
              <span className="text-slate-400 text-xs ml-2">
                {isVi ? "— Kỹ năng công nghệ" : "— Tech stack & tools"}
              </span>
            </div>
            <div>
              <span className="text-green-400 font-mono font-bold">projects</span>
              <span className="text-slate-400 text-xs ml-2">
                {isVi ? "— Xem danh sách dự án" : "— View project list"}
              </span>
            </div>
            <div>
              <span className="text-green-400 font-mono font-bold">contact</span>
              <span className="text-slate-400 text-xs ml-2">
                {isVi ? "— Thông tin liên hệ" : "— Contact information"}
              </span>
            </div>
            <div>
              <span className="text-green-400 font-mono font-bold">sudo hire</span>
              <span className="text-slate-400 text-xs ml-2">
                {isVi ? "— Tuyển dụng ngay" : "— Hire developer"}
              </span>
            </div>
            <div>
              <span className="text-green-400 font-mono font-bold">clear</span>
              <span className="text-slate-400 text-xs ml-2">
                {isVi ? "— Xóa màn hình" : "— Clear console"}
              </span>
            </div>
          </div>
        </div>
      );
    } else if (lower === "whoami" || lower === "about" || lower === "cat about.json") {
      outputNode = (
        <div className="p-3 my-1 rounded bg-zinc-950/80 border border-blue-500/30 font-mono text-xs sm:text-sm space-y-1">
          <p className="text-blue-400 font-bold">{"{"}</p>
          <p className="pl-4 text-slate-300">
            name: <span className="text-green-400">"{t("common.name")}"</span>,
          </p>
          <p className="pl-4 text-slate-300">
            age: <span className="text-green-400">"{age} {t("about.ageUnit")}"</span>,
          </p>
          <p className="pl-4 text-slate-300">
            role: <span className="text-green-400">"{t("about.roleValue")}"</span>,
          </p>
          <p className="pl-4 text-slate-300">
            passion: [<span className="text-green-400">"{t("about.passion.coding")}"</span>, <span className="text-green-400">"{t("about.passion.uiux")}"</span>, <span className="text-green-400">"{t("about.passion.solving")}"</span>],
          </p>
          <p className="pl-4 text-slate-300">
            status: <span className="text-cyan-400">"Open for opportunities 🚀"</span>
          </p>
          <p className="text-blue-400 font-bold">{"}"}</p>
        </div>
      );
    } else if (lower === "skills" || lower === "./skills") {
      outputNode = (
        <div className="py-1 space-y-1.5 text-xs sm:text-sm">
          <p className="text-purple-400 font-semibold">⚡ Tech Stack Inventory:</p>
          <div className="flex flex-wrap gap-1.5">
            {["React 19", "Next.js 16", "TypeScript", "Tailwind CSS", "Node.js", "Python", "FastAPI", "PostgreSQL (Neon)", "Cloudflare Workers", "Docker", "Git"].map((s) => (
              <span key={s} className="px-2 py-0.5 rounded bg-blue-950/70 border border-blue-500/40 text-blue-300 text-xs font-mono">
                {s}
              </span>
            ))}
          </div>
        </div>
      );
    } else if (lower === "projects" || lower === "./projects") {
      outputNode = (
        <div className="py-1 text-xs sm:text-sm text-slate-300 space-y-1">
          <p className="text-cyan-400 font-semibold">
            {isVi ? "📂 Điều hướng đến mục Dự Án..." : "📂 Navigating to Projects..."}
          </p>
          <p className="text-slate-400 text-xs">
            {isVi ? "Đã hiển thị các dự án tiêu biểu bên dưới!" : "Top projects highlighted below!"}
          </p>
        </div>
      );
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else if (lower === "contact" || lower === "./contact") {
      outputNode = (
        <div className="py-1 text-xs sm:text-sm text-slate-300 space-y-1">
          <p className="text-emerald-400 font-semibold">📬 Contact Info:</p>
          <p>• Email: <a href="mailto:sonpv.work@gmail.com" className="text-blue-400 underline">sonpv.work@gmail.com</a></p>
          <p>• Domain: <span className="text-green-400">https://mnt.id.vn</span></p>
        </div>
      );
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else if (lower === "sudo hire" || lower === "hire") {
      outputNode = (
        <div className="p-3 my-1 rounded bg-emerald-950/60 border border-emerald-500/50 text-xs sm:text-sm space-y-1 text-emerald-300 font-mono">
          <p className="font-bold text-emerald-400">✅ [ACCESS GRANTED] Pham Son is available!</p>
          <p>{isVi ? "Rất vui được hợp tác cùng bạn! Đang mở mục Liên Hệ..." : "Great decision! Redirecting to contact form..."}</p>
        </div>
      );
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      outputNode = (
        <p className="text-red-400 text-xs sm:text-sm font-mono">
          {isVi 
            ? `zsh: command not found: ${trimmed}. Gõ 'help' để xem danh sách lệnh.` 
            : `zsh: command not found: ${trimmed}. Type 'help' for available commands.`}
        </p>
      );
    }

    setHistory((prev) => [
      ...prev,
      { id, command: trimmed, output: outputNode },
    ]);
    setInput("");
  };

  const handleQuickClick = (cmd: string) => {
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    }
  };

  // Preset quick commands
  const quickSuggestions = [
    { label: "help", cmd: "help", icon: <Sparkles className="w-3 h-3 text-yellow-400" /> },
    { label: "whoami", cmd: "whoami", icon: <User className="w-3 h-3 text-blue-400" /> },
    { label: "skills", cmd: "skills", icon: <Code className="w-3 h-3 text-purple-400" /> },
    { label: "projects", cmd: "projects", icon: <Briefcase className="w-3 h-3 text-cyan-400" /> },
    { label: "contact", cmd: "contact", icon: <Mail className="w-3 h-3 text-emerald-400" /> },
    { label: "sudo hire", cmd: "sudo hire", icon: <ShieldCheck className="w-3 h-3 text-green-400" /> },
    { label: "clear", cmd: "clear", icon: <Trash2 className="w-3 h-3 text-slate-400" /> },
  ];

  return (
    <div className="w-full space-y-3">
      {/* Main Terminal Window */}
      <div 
        className="bg-zinc-950/95 dark:bg-black/95 border border-slate-700/60 dark:border-zinc-800 rounded-lg shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-blue-500/50"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/90 hover:opacity-80 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 hover:opacity-80 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-green-500/90 hover:opacity-80 transition-opacity" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>bash - phamson@mnt.id.vn:~</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 font-medium hidden sm:inline">LIVE</span>
          </div>
        </div>

        {/* Output Screen */}
        <div className="p-4 h-64 sm:h-72 overflow-y-auto font-mono text-xs sm:text-sm space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400 font-bold">visitor@mnt:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
              )}
              {item.output && <div className="pl-1">{item.output}</div>}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1 text-slate-200">
            <span className="text-emerald-400 font-bold">visitor@mnt:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isVi ? "Gõ lệnh (vd: help)..." : "Type command (e.g. help)..."}
              className="flex-1 bg-transparent outline-none border-none text-white font-mono placeholder:text-zinc-600 focus:ring-0 p-0 text-xs sm:text-sm"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              onClick={() => executeCommand(input)}
              className="text-zinc-500 hover:text-blue-400 p-1 transition-colors"
              title="Execute"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick Suggestion Chips (Gợi ý ấn nhanh) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span className="font-semibold text-slate-700 dark:text-zinc-300">
              {isVi ? "Gợi ý ấn nhanh:" : "Quick Commands:"}
            </span>
          </span>
          <span className="text-[11px] text-zinc-500">
            {isVi ? "Click để chạy lệnh" : "Click to execute"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((item) => (
            <button
              key={item.cmd}
              onClick={() => handleQuickClick(item.cmd)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-mono transition-all duration-200 shadow-sm hover:shadow-blue-500/10 active:scale-95 group"
            >
              {item.icon}
              <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
