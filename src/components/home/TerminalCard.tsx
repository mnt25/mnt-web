import React, { useState, useRef, useEffect, useCallback } from "react";
import { Terminal, Sparkles, User, Code, Mail, Trash2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface HistoryItem {
  id: string;
  command?: string;
  output?: React.ReactNode;
}

const birthYear = 2003;
const age = new Date().getFullYear() - birthYear;

const AUTO_COMMANDS = ["whoami", "skills", "contact"];

export const TerminalCard: React.FC = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  const isVi = language === "vi";

  // IntersectionObserver: Only auto-type when visible on screen
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  // Initial welcome message (clean & concise)
  useEffect(() => {
    setHistory([
      {
        id: "welcome",
        output: (
          <div className="text-xs font-mono text-zinc-400">
            <p className="text-cyan-400 font-semibold">MNT Core v3.0 [Online]</p>
          </div>
        ),
      },
    ]);
  }, [language, isVi]);

  // Smooth scroll terminal to bottom on new output
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history, input]);

  // Command generator (chỉ giữ các thông tin cốt lõi, tinh gọn nhất)
  const getCommandOutput = useCallback(
    (cmdStr: string): React.ReactNode => {
      const lower = cmdStr.trim().toLowerCase();

      if (lower === "whoami" || lower === "about") {
        return (
          <div className="p-2.5 my-1 rounded-lg bg-zinc-900/90 border border-white/10 font-mono text-xs space-y-1">
            <p className="text-zinc-300">
              <span className="text-cyan-400 font-semibold">name:</span> <span className="text-emerald-400">"Phạm Sơn"</span>
            </p>
            <p className="text-zinc-300">
              <span className="text-cyan-400 font-semibold">age:</span> <span className="text-emerald-400">{age} (2003)</span>
            </p>
            <p className="text-zinc-300">
              <span className="text-cyan-400 font-semibold">role:</span> <span className="text-emerald-400">"Software & AI Engineer"</span>
            </p>
            <p className="text-zinc-300">
              <span className="text-cyan-400 font-semibold">location:</span> <span className="text-emerald-400">"Hà Nội, Việt Nam"</span>
            </p>
            <p className="text-zinc-300">
              <span className="text-cyan-400 font-semibold">status:</span> <span className="text-cyan-300 font-medium">"Open for opportunities 🚀"</span>
            </p>
          </div>
        );
      } else if (lower === "skills" || lower === "./skills") {
        return (
          <div className="p-2.5 my-1 rounded-lg bg-zinc-900/90 border border-white/10 font-mono text-xs space-y-1">
            <p className="text-zinc-300">
              <span className="text-cyan-400 font-semibold">ai:</span> <span className="text-zinc-200">FastAPI, OpenAI, AI Agents, RAG</span>
            </p>
            <p className="text-zinc-300">
              <span className="text-cyan-400 font-semibold">web:</span> <span className="text-zinc-200">React, Next.js, Node.js, Python, TypeScript</span>
            </p>
            <p className="text-zinc-300">
              <span className="text-cyan-400 font-semibold">cloud & db:</span> <span className="text-zinc-200">PostgreSQL, MongoDB, Docker, Linux, Git</span>
            </p>
          </div>
        );
      } else if (lower === "contact" || lower === "./contact") {
        return (
          <div className="p-2.5 my-1 rounded-lg bg-zinc-900/90 border border-white/10 font-mono text-xs space-y-1">
            <p className="text-zinc-300">
              <span className="text-emerald-400 font-semibold">email:</span> <a href="mailto:mnt250723@gmail.com" className="text-cyan-400 underline ml-1">mnt250723@gmail.com</a>
            </p>
            <p className="text-zinc-300">
              <span className="text-emerald-400 font-semibold">github:</span> <a href="https://github.com/ps257" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline ml-1">github.com/ps257</a>
            </p>
            <p className="text-zinc-300">
              <span className="text-emerald-400 font-semibold">website:</span> <span className="text-emerald-400 ml-1">https://mnt.id.vn</span>
            </p>
          </div>
        );
      }

      return (
        <p className="text-rose-400 text-xs font-mono">
          {isVi ? `zsh: không tìm thấy lệnh: ${cmdStr}` : `zsh: command not found: ${cmdStr}`}
        </p>
      );
    },
    [isVi]
  );

  const executeCommand = useCallback(
    (cmdStr: string) => {
      const trimmed = cmdStr.trim();
      if (!trimmed) return;

      const lower = trimmed.toLowerCase();
      if (lower === "clear" || lower === "cls") {
        setHistory([]);
        setInput("");
        return;
      }

      const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
      const outputNode = getCommandOutput(trimmed);

      setHistory((prev) => [
        ...prev,
        { id, command: trimmed, output: outputNode },
      ]);
      setInput("");
    },
    [getCommandOutput]
  );

  // Auto-typing engine: types continuously, pauses, executes, clears, and repeats forever
  useEffect(() => {
    if (!isInView) return;

    let cmdIdx = 0;
    let charIdx = 0;
    let isTyping = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentCmd = AUTO_COMMANDS[cmdIdx % AUTO_COMMANDS.length];

      if (isTyping) {
        if (charIdx < currentCmd.length) {
          charIdx++;
          setInput(currentCmd.substring(0, charIdx));
          timeoutId = setTimeout(tick, 80);
        } else {
          // Finished typing command -> execute
          isTyping = false;
          timeoutId = setTimeout(() => {
            executeCommand(currentCmd);
            // Reading pause after output (~3s)
            timeoutId = setTimeout(() => {
              cmdIdx++;
              charIdx = 0;
              isTyping = true;

              // If completed the whole cycle, clear first to clean screen
              if (cmdIdx % AUTO_COMMANDS.length === 0) {
                setInput("clear");
                timeoutId = setTimeout(() => {
                  setHistory([]);
                  setInput("");
                  timeoutId = setTimeout(tick, 800);
                }, 400);
              } else {
                tick();
              }
            }, 3000);
          }, 400);
        }
      }
    };

    timeoutId = setTimeout(tick, 1000);

    return () => clearTimeout(timeoutId);
  }, [isInView, executeCommand]);

  const handleQuickClick = (e: React.MouseEvent, cmd: string) => {
    e.preventDefault();
    e.stopPropagation();
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  const quickSuggestions = [
    { label: "whoami", cmd: "whoami", icon: <User className="w-3 h-3 text-cyan-400" /> },
    { label: "skills", cmd: "skills", icon: <Code className="w-3 h-3 text-purple-400" /> },
    { label: "contact", cmd: "contact", icon: <Mail className="w-3 h-3 text-blue-400" /> },
    { label: "clear", cmd: "clear", icon: <Trash2 className="w-3 h-3 text-zinc-400" /> },
  ];

  return (
    <div ref={cardRef} className="w-full space-y-3 select-none">
      {/* Main Terminal Window */}
      <div
        className="bg-zinc-950 border border-black/10 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 select-none">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>mnt-inspector@bash</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 font-medium">AUTO</span>
          </div>
        </div>

        {/* Output Screen */}
        <div
          ref={scrollContainerRef}
          className="p-4 h-60 sm:h-64 overflow-y-auto font-mono text-xs space-y-2.5 scroll-smooth"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <span className="text-cyan-400 font-bold">mnt:~$</span>
                  <span className="text-white font-medium">{item.command}</span>
                </div>
              )}
              {item.output && <div className="pl-1">{item.output}</div>}
            </div>
          ))}

          {/* Active Auto-Typing Input Line with blinking cursor */}
          <div className="flex items-center gap-2 pt-1 text-zinc-200">
            <span className="text-cyan-400 font-bold">mnt:~$</span>
            <span className="text-white font-mono text-xs">
              {input}
            </span>
            <span className="w-1.5 h-3.5 bg-cyan-400 animate-pulse inline-block" />
          </div>
        </div>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3 h-3 text-cyan-500" />
            <span>{isVi ? "Gợi ý nhanh (Click để chạy):" : "Quick actions (Click to run):"}</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {quickSuggestions.map((item) => (
            <button
              key={item.cmd}
              type="button"
              onClick={(e) => handleQuickClick(e, item.cmd)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/10 hover:border-cyan-500/40 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs font-mono transition-all active:scale-95"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerminalCard;
