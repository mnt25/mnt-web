import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { api } from "../../../server/api";

const CVManager = () => {
  const [cvLink, setCvLink] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCV = async () => {
      const link = await api.getCVLink();
      setCvLink(link);
    };
    fetchCV();
  }, []);

  const handleSave = async () => {
    const success = await api.updateCVLink(cvLink);

    if (success) {
      setMessage("Đã lưu link CV thành công!");
      setTimeout(() => setMessage(""), 2500);
    } else {
      setMessage("Lỗi khi lưu CV!");
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Quản lý CV
      </h2>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Link tải CV (Google Drive, Dropbox…)
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            value={cvLink}
            onChange={(e) => setCvLink(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="https://..."
          />

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Lưu
          </button>
        </div>

        {message && (
          <p className="mt-3 text-sm text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CVManager;
