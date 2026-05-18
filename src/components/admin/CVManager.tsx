import { useState, useEffect } from "react";
import { Save, FileText, Terminal, Link, Shield, Loader2, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import { api } from "../../../server/api";

const CVManager = () => {
  const [cvLink, setCvLink] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  // Styled Toast States
  const [toasts, setToasts] = useState<{ id: string; type: "success" | "error" | "warning"; text: string }[]>([]);

  const showToast = (text: string, type: "success" | "error" | "warning" = "success") => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cvData, statusData] = await Promise.all([
          api.getAdminCVLink(),
          api.getAccountStatus()
        ]);
        setCvLink(cvData.link);
        setIsEnabled(statusData.enabled);
      } catch (err) {
        console.error("Lỗi khi tải cấu hình CV:", err);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const success = await api.updateCVLink(cvLink);
      if (success) {
        showToast("Đã cập nhật và lưu trữ đường dẫn CV thành công!", "success");
      } else {
        showToast("Gặp sự cố trong quá trình đồng bộ hóa đường dẫn CV!", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Kết nối máy chủ bị gián đoạn!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    if (toggleLoading) return;
    setToggleLoading(true);
    const nextState = !isEnabled;
    try {
      const success = await api.updateAccountStatus(nextState);
      if (success) {
        setIsEnabled(nextState);
        showToast(
          nextState 
            ? "Đã cho phép khách tải CV công khai!" 
            : "Đã tắt quyền tải CV của khách công cộng!", 
          "success"
        );
      } else {
        showToast("Cập nhật tùy chọn thất bại!", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Kết nối máy chủ bị lỗi!", "error");
    } finally {
      setToggleLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6 select-none font-sans relative">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-800/80">
        <span className="font-mono text-xs text-blue-500 uppercase tracking-widest font-bold block mb-1">
          CV STORAGE PATH & ACCESS CONTROL
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-400" />
          QUẢN LÝ CV CỦA BẠN
        </h2>
      </div>

      {/* Control Box */}
      <div className="bg-zinc-950/45 backdrop-blur-md p-6 border border-zinc-800 rounded-none relative">
        {/* Corner tech indicators */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700" />

        <div className="space-y-6">
          {/* Subsection 1: Link config */}
          <div>
            <label className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-2.5">
              Đường dẫn tải xuống CV (Google Drive, Dropbox, iCloud...)
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={cvLink}
                  onChange={(e) => setCvLink(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-zinc-800 bg-zinc-950 text-white rounded-none focus:border-blue-500 focus:shadow-[0_0_8px_rgba(59,130,246,0.2)] outline-none font-mono text-xs transition-all duration-300"
                  placeholder="https://..."
                />
                <Link className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
              </div>

              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 rounded-none shadow-[0_0_8px_rgba(59,130,246,0.3)] disabled:opacity-50 min-w-[170px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    ĐANG LƯU...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    LƯU ĐƯỜNG DẪN
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Subsection 2: Toggle Switch */}
          <div className="pt-6 border-t border-zinc-900 space-y-3">
            <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-none relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500" />
              <div>
                <span className="block font-mono text-xs font-bold text-zinc-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  CHO PHÉP KHÁCH TẢI CV
                </span>
                <p className="text-xs font-mono text-zinc-400 mt-1 uppercase">
                  Tự động vô hiệu hóa luồng tải file CV của bạn từ API công cộng khi được tắt.
                </p>
              </div>

              {/* High-tech Neon Toggle Switch with ON/OFF Labels */}
              <button
                onClick={handleToggle}
                disabled={toggleLoading}
                className={`relative inline-flex h-7 w-20 items-center rounded-none transition-all duration-300 outline-none border font-mono text-[9px] font-extrabold tracking-widest select-none ${
                  isEnabled
                    ? "bg-blue-600/10 border-blue-500/80 shadow-[0_0_8px_rgba(59,130,246,0.25)]"
                    : "bg-zinc-950 border-zinc-800"
                }`}
              >
                {toggleLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto text-blue-400" />
                ) : (
                  <>
                    {/* Background inactive states */}
                    <span className="absolute left-2.5 text-zinc-600">OFF</span>
                    <span className="absolute right-3.5 text-blue-400/50">ON</span>
                    
                    {/* Sliding Knob representing active state */}
                    <span
                      className={`absolute top-0.5 bottom-0.5 w-[36px] flex items-center justify-center font-mono text-[9px] font-extrabold text-white transition-all duration-300 ${
                        isEnabled
                          ? "left-[40px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                          : "left-[2px] bg-zinc-800 border border-zinc-700 text-zinc-400"
                      }`}
                    >
                      {isEnabled ? "ON" : "OFF"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative mechanical notes for futuristic feeling */}
      <div className="p-4 bg-zinc-950/20 border border-zinc-900 font-mono text-xs text-zinc-400 uppercase leading-relaxed space-y-1">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Terminal className="w-3.5 h-3.5" />
          <span>HƯỚNG DẪN CẤU HÌNH</span>
        </div>
        <p>// 1. Hãy đảm bảo link CV ở trạng thái "Bất kỳ ai có liên kết đều có thể truy cập" (Anyone with the link can view).</p>
        <p>// 2. Tránh sử dụng liên kết rút gọn để tăng tính ổn định của đường dẫn tải xuống.</p>
        <p>// 3. Bạn có thể tạm thời vô hiệu hóa nút tải xuống trực tiếp tại đây bằng công tắc phân quyền.</p>
      </div>

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

export default CVManager;
