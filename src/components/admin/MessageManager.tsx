import { useEffect, useState } from "react";
import {
  Trash2,
  MessageSquare,
  Mail,
  Clock,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { api } from "../../../server/api";
import type { ContactMessage } from "../../types/contact";
import AdminSkeletonLoader from "./AdminSkeletonLoader";

const MessageManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    showToast(`Đã sao chép email: ${email}`, "success");
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleDelete = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Xác Nhận Xóa Tin Nhắn",
      message: "Bạn có chắc chắn muốn xóa vĩnh viễn tin nhắn này khỏi hệ thống?",
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

  if (loading) {
    return (
      <AdminSkeletonLoader
        title="Đang"
        italicWord="nạp"
        endWord="tin nhắn"
        subtitle="Đang kéo hòm thư liên hệ — từng bức thư một, kiên nhẫn nhé!"
        cardsCount={4}
      />
    );
  }

  return (
    <div className="space-y-6 select-none font-sans relative">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HỘP THƯ LIÊN HỆ KHÁCH HÀNG</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Tin Nhắn Liên Hệ
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 mt-1">
            Tổng hợp các phản hồi, lời mời phỏng vấn & dự án gửi từ form liên hệ
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-white dark:bg-zinc-900/80 border border-black/[0.08] dark:border-white/[0.08] font-mono text-xs text-zinc-600 dark:text-zinc-300 shadow-xs">
          Tổng số: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{messages.length}</strong> tin nhắn
        </div>
      </div>

      {/* Message list */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-zinc-900/40">
            <MessageSquare className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
            <p className="font-mono text-xs text-zinc-500">
              Chưa có tin nhắn liên hệ nào trong hộp thư.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-emerald-500/40 dark:hover:border-emerald-400/40 rounded-3xl p-6 relative group shadow-sm transition-all duration-300"
            >
              {/* Message metadata details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.05] dark:border-white/[0.05] pb-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <div className="flex items-center gap-2 text-zinc-950 dark:text-white font-bold text-sm">
                    <div className="w-7 h-7 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-mono text-xs">
                      {msg.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span>{msg.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 font-mono">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <a
                      href={`mailto:${msg.email}`}
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {msg.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(msg.email)}
                      className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                      title="Sao chép email"
                    >
                      {copiedEmail === msg.email ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>
                      {new Date(msg.date || msg.created_at || "").toLocaleString("vi-VN")}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 border border-black/5 dark:border-white/5 transition-all cursor-pointer"
                    title="Xóa tin nhắn"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message content */}
              <div className="mt-4">
                <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 bg-zinc-50/80 dark:bg-zinc-800/40 border border-black/[0.04] dark:border-white/[0.04] p-4 rounded-2xl leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modern Confirm Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-6 sm:p-7 rounded-3xl max-w-md w-full relative select-none shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4 mb-5">
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                  {confirmDialog.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono leading-relaxed">
                  {confirmDialog.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium transition-all cursor-pointer"
                disabled={confirmDialog.loading}
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                disabled={confirmDialog.loading}
              >
                {confirmDialog.loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang xóa...</span>
                  </>
                ) : (
                  "Xác nhận xóa"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toasts Container */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-2xl border font-mono text-xs shadow-xl flex items-center gap-3 backdrop-blur-xl pointer-events-auto animate-in slide-in-from-bottom-5 duration-200 ${
              t.type === "success"
                ? "bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                : t.type === "error"
                ? "bg-rose-50/95 dark:bg-rose-950/90 border-rose-500/30 text-rose-800 dark:text-rose-300"
                : "bg-amber-50/95 dark:bg-amber-950/90 border-amber-500/30 text-amber-800 dark:text-amber-300"
            }`}
          >
            {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
            {t.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
            {t.type === "warning" && <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />}
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageManager;
