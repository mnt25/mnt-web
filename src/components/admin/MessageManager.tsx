import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { api } from "../../../server/api";
import type { ContactMessage } from "../../types/contact";

const MessageManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const data = await api.getMessages();
    setMessages(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa tin nhắn này?")) return;

    const success = await api.deleteMessage(id);
    if (success) loadMessages();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Tin nhắn liên hệ
      </h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            Chưa có tin nhắn nào.
          </div>
        ) : (
          <div className="divide-y dark:divide-slate-700">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {msg.name}
                    </h3>

                    <p className="text-sm text-blue-600">{msg.email}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">
                      {new Date(msg.date || msg.created_at || "").toLocaleString()}
                    </span>

                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border dark:border-slate-700/50">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageManager;
