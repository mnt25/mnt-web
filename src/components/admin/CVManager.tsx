import { useState, useEffect } from "react";
import {
  Save,
  FileText,
  Link,
  Shield,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Sparkles,
  User,
  GraduationCap,
  Award,
  Globe,
  MapPin,
  Mail,
} from "lucide-react";
import { api } from "../../../server/api";
import AdminSkeletonLoader from "./AdminSkeletonLoader";

const CVManager = () => {
  const [cvLink, setCvLink] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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
          api.getAccountStatus(),
        ]);
        setCvLink(cvData.link);
        setIsEnabled(statusData.enabled);
      } catch (err) {
        console.error("Lỗi khi tải cấu hình CV:", err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const success = await api.updateCVLink(cvLink);
      if (success) {
        showToast("Đã lưu và cập nhật đường dẫn CV thành công!", "success");
      } else {
        showToast("Gặp sự cố khi lưu đường dẫn CV!", "error");
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
            ? "Đã bật: Khách truy cập có thể xem trực tiếp CV trên web!" 
            : "Đã tắt: Khi khách bấm xem CV sẽ hiển thị thông báo bảo trì!", 
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

  if (initialLoading) {
    return (
      <AdminSkeletonLoader
        title="Đang"
        italicWord="nạp"
        endWord="hồ sơ cá nhân"
        subtitle="Đang tải dữ liệu hồ sơ và liên kết CV — kiên nhẫn một chút nhé!"
        cardsCount={3}
      />
    );
  }

  return (
    <div className="max-w-4xl space-y-8 select-none font-sans relative pb-10 animate-in fade-in duration-200">
      {/* Header Section */}
      <div className="pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>HỒ SƠ CÁ NHÂN & CẤU HÌNH CV</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Quản Lý Hồ Sơ & CV
        </h2>
        <p className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 mt-1">
          Xem thông tin chuyên môn, chứng chỉ đào tạo và cấu hình đường dẫn tài liệu CV trực tuyến
        </p>
      </div>

      {/* SECTION 1: Cấu hình Liên kết CV & Trạng thái truy cập */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] shadow-sm space-y-6 relative overflow-hidden">
        {/* Top gradient accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-950 dark:text-white">
              Cấu Hình Liên Kết CV Trực Tuyến
            </h3>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Đường dẫn Google Drive file PDF hiển thị trực tiếp trong Live Preview Modal
            </p>
          </div>
        </div>

        {/* Link input area */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
            Đường dẫn Google Drive CV (hoặc link PDF trực tiếp):
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Link className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={cvLink}
                onChange={(e) => setCvLink(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-xs sm:text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                placeholder="https://drive.google.com/file/d/.../view"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50 min-w-[150px] cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu Đường Dẫn</span>
                </>
              )}
            </button>
          </div>

          {cvLink && cvLink !== "#" && (
            <div className="pt-1">
              <a
                href={cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Kiểm tra mở liên kết trực tiếp trên tab mới</span>
              </a>
            </div>
          )}
        </div>

        {/* Toggle Switch */}
        <div className="pt-4 border-t border-black/5 dark:border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-black/5 dark:border-white/5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-bold text-zinc-950 dark:text-white">
                  Cho Phép Khách Xem CV Trực Tuyến
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Khi tắt: Khách bấm vào nút CV trên trang chủ sẽ nhận được thông báo bảo trì cùng thông tin liên hệ.
              </p>
            </div>

            {/* Modern iOS Style Switch Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={isEnabled}
              onClick={handleToggle}
              disabled={toggleLoading}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${
                isEnabled ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                  isEnabled ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {toggleLoading ? (
                  <Loader2 className="w-3 h-3 text-zinc-500 animate-spin" />
                ) : (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isEnabled ? "bg-cyan-500" : "bg-zinc-400"
                    }`}
                  />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: Thông tin Hồ sơ cá nhân (Profile Overview) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/60 border border-black/[0.08] dark:border-white/[0.08] shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-950 dark:text-white">
              Thông Tin Hồ Sơ Chuyên Môn
            </h3>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Tổng quan thông tin kỹ sư phần mềm & AI đang hiển thị trên trang chủ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-black/5 dark:border-white/5 space-y-1">
            <span className="text-[11px] font-mono text-zinc-400 block">HỌ VÀ TÊN</span>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block">Phạm Sơn</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-black/5 dark:border-white/5 space-y-1">
            <span className="text-[11px] font-mono text-zinc-400 block">CHỨC DANH</span>
            <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400 block">Software & AI Engineer</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-black/5 dark:border-white/5 space-y-1">
            <span className="text-[11px] font-mono text-zinc-400 block flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-500" /> ĐỊA ĐIỂM LÀM VIỆC
            </span>
            <span className="text-xs font-mono text-zinc-800 dark:text-zinc-200 block">Hà Nội, Việt Nam</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-black/5 dark:border-white/5 space-y-1">
            <span className="text-[11px] font-mono text-zinc-400 block flex items-center gap-1">
              <Mail className="w-3 h-3 text-cyan-500" /> EMAIL CHÍNH THỨC
            </span>
            <span className="text-xs font-mono text-zinc-800 dark:text-zinc-200 block">phamson.work@gmail.com</span>
          </div>
        </div>

        {/* Bằng cấp & Chứng chỉ */}
        <div className="pt-2 space-y-3">
          <span className="text-xs font-mono text-zinc-500 font-semibold uppercase flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-cyan-500" /> Bằng Cấp & Chứng Chỉ Đào Tạo Đã Xác Thực
          </span>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-cyan-500 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                    BTEC Higher National Diploma in Computing (Software Engineering)
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">Cao Đẳng Anh Quốc BTEC FPT</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold shrink-0">
                Đã Tốt Nghiệp
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-cyan-500 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                    Chương trình Đào tạo Nhân tài AI Thực chiến (Track AI Applications)
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">VinUni & Tập đoàn Vingroup</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold shrink-0">
                Chứng Chỉ AI
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-cyan-500 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                    Chứng Chỉ Tiếng Anh Chuẩn B2
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">Hệ Thống Giáo Dục FPT</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-semibold shrink-0">
                B2 Level
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Card */}
      <div className="p-5 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-200">
          <Globe className="w-4 h-4 text-cyan-500" />
          <span>Đồng bộ hóa tức thì trên trang chủ:</span>
        </div>
        <p className="pl-6 leading-relaxed">
          Mọi thay đổi về đường dẫn CV hoặc trạng thái hiển thị đều được đồng bộ ngay lập tức với nút <strong>"CV"</strong> trên thanh điều hướng và màn hình Hero trang chủ.
        </p>
      </div>

      {/* Toasts Container */}
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

export default CVManager;
