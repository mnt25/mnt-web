import { useEffect, useState } from "react";
import { Trash2, MessageSquare, Mail, User, Clock, Terminal, Loader2, CheckCircle2, AlertTriangle, HelpCircle, AlertCircle } from "lucide-react";
import { api } from "../../../server/api";
import type { ContactMessage } from "../../types/contact";

const MessageManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [toasts, setToasts] = useState<{ id: string; type: "success" | "error" | "warning"; text: string }[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    loading?: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showToast = (text: string, type: "success" | "error" | "warning" = "success") => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await api.getMessages();
      setMessages(data);
    } catch (err) {
      console.error("Lỗi khi tải tin nhắn liên hệ:", err);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "XÓA TIN NHẮN VĨNH VIỄN",
      message: "Bạn có chắc chắn muốn xóa vĩnh viễn tin nhắn này? Bản ghi sẽ bị loại bỏ hoàn toàn khỏi cơ sở dữ liệu và không thể khôi phục.",
      onConfirm: async () => {
        setConfirmDialog((prev) => ({ ...prev, loading: true }));
        try {
          const success = await api.deleteMessage(id);
          if (success) {
            loadMessages();
            showToast("Đã xóa tin nhắn thành công!", "success");
          } else {
            showToast("Gặp lỗi xảy ra khi xóa tin nhắn!", "error");
          }
        } catch (err) {
          console.error("Lỗi khi xóa tin nhắn:", err);
          showToast("Kết nối máy chủ bị lỗi!", "error");
        } finally {
          setConfirmDialog({
            isOpen: false,
            title: "",
            message: "",
            onConfirm: () => {},
          });
        }
      },
    });
  };

  return (
    <div className="space-y-6 select-none font-sans relative">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <span className="font-mono text-xs text-blue-500 uppercase tracking-widest font-bold block mb-1">
            INBOX / SYSTEM FEEDBACK LOGS
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            TIN NHẮN LIÊN HỆ
          </h2>
        </div>
        <div className="bg-zinc-950/60 border border-zinc-800 p-2 font-mono text-[10px] text-zinc-400 uppercase">
          logs_count: {messages.length} total
        </div>
      </div>

      {/* Message console feeds */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-12 text-center border border-zinc-850 bg-zinc-950/20 relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700" />
            
            <span className="font-mono text-xs text-zinc-500 italic">
              // Không tìm thấy bất kỳ bản ghi tin nhắn nào trên hệ thống.
            </span>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-zinc-950/40 border border-zinc-800 hover:border-zinc-700 transition-colors p-5 relative group"
            >
              {/* Technical indicators on corners */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-600" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-zinc-600" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-zinc-600" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-600" />

              {/* Message metadata details */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-white font-bold">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>{msg.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-zinc-400 font-mono">
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    <a 
                      href={`mailto:${msg.email}`} 
                      className="hover:text-blue-400 transition-colors underline decoration-zinc-800 hover:decoration-blue-500"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 text-xs font-mono text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-600" />
                    <span>
                      {new Date(msg.date || msg.created_at || "").toLocaleString("en-GB")}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 border border-zinc-800 bg-zinc-900/50 hover:bg-red-950/20 hover:border-red-500/50 text-zinc-500 hover:text-red-400 transition-all duration-300"
                    title="Xóa tin nhắn"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message content block styled like a console text output */}
              <div className="mt-4 relative">
                <div className="absolute top-2.5 left-3 flex items-center gap-1.5 text-zinc-600 font-mono text-[9px] pointer-events-none select-none uppercase">
                  <Terminal className="w-2.5 h-2.5" />
                  <span>message_output_stream</span>
                </div>
                <p className="font-mono text-xs text-zinc-300 bg-[#040405] border border-zinc-900/60 pl-4 pr-4 pt-7 pb-4 rounded-none leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cyber Confirm Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-[#000000bd] backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 p-6 max-w-md w-full relative select-none">
            {/* Blueprint Frame corner indicators */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-600" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-600" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-600" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-600" />

            <div className="flex items-start gap-4 mb-5">
              <div className="p-3 border border-red-900/30 bg-red-950/20 text-red-500 rounded-none">
                <AlertCircle className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-red-400">
                  {confirmDialog.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {confirmDialog.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 border border-zinc-800 hover:bg-zinc-900 text-zinc-400 font-bold transition-all"
                disabled={confirmDialog.loading}
              >
                HỦY BỎ
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-[0_0_8px_rgba(220,38,38,0.3)] flex items-center gap-2"
                disabled={confirmDialog.loading}
              >
                {confirmDialog.loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    ĐANG XÓA...
                  </>
                ) : (
                  "XÁC NHẬN XÓA"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cyber Toasts Container */}
      <div className="fixed bottom-6 right-6 z-[9999] space-y-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 border font-mono text-xs uppercase tracking-wider backdrop-blur-md min-w-[280px] shadow-lg flex items-center gap-3 animate-fade-in pointer-events-auto rounded-none relative ${
              t.type === "success"
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-400"
                : t.type === "error"
                ? "bg-red-950/80 border-red-500 text-red-400"
                : "bg-amber-950/80 border-amber-500 text-amber-400"
            }`}
          >
            {/* Vertical neon accent indicator */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${
                t.type === "success"
                  ? "bg-emerald-500"
                  : t.type === "error"
                  ? "bg-red-500"
                  : "bg-amber-500"
              }`}
            />
            {t.type === "success" && <CheckCircle2 className="w-5 h-5 flex-shrink-0 animate-bounce text-emerald-400" />}
            {t.type === "error" && <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400 animate-ping" />}
            {t.type === "warning" && <HelpCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />}
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageManager;
