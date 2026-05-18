import { useState } from "react";
import { UserCog, Palette, Terminal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const AccountManager = () => {
    const [message] = useState("");

    return (
        <div className="max-w-3xl space-y-6 select-none font-sans">
            {/* Header */}
            <div className="pb-4 border-b border-zinc-800/80">
                <span className="font-mono text-xs text-blue-400 uppercase tracking-widest font-bold block mb-1">
                    SYSTEM SECURITY & PREFERENCES
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <UserCog className="w-6 h-6 text-blue-400" />
                    CÀI ĐẶT HỆ THỐNG
                </h2>
            </div>

            {/* Container box */}
            <div className="bg-zinc-950/45 backdrop-blur-md p-6 border border-zinc-800 rounded-none relative space-y-8">
                {/* Corner blueprint lines */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700" />

                {/* Section: Visual Interface preferences */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 border border-indigo-900/30 bg-indigo-950/20 text-indigo-400">
                            <Palette className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider">
                                GIAO DIỆN & HIỂN THỊ
                            </h3>
                            <p className="text-xs font-mono text-zinc-400 uppercase">Adjust system dark/light presentation</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-none relative">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500" />
                        <div>
                            <span className="block font-mono text-xs font-bold text-zinc-300">
                                CHẾ ĐỘ HIỂN THỊ
                            </span>
                            <p className="text-xs font-mono text-zinc-400 mt-1 uppercase">
                                Chuyển đổi giữa chế độ sáng và tối của hệ thống Nexus Dashboard.
                            </p>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Info and action alerts */}
                {message && (
                    <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-none relative">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500" />
                        <p className="font-mono text-[11px] text-blue-400">
                            {message}
                        </p>
                    </div>
                )}
            </div>

            {/* Sub mechanical footnotes */}
            <div className="p-4 bg-zinc-950/20 border border-zinc-900 font-mono text-xs text-zinc-400 uppercase leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-300">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>SYSTEM FOOTNOTES // LOG_ACCESS</span>
                </div>
                <p>// Phiên làm việc (Session) của bạn có giá trị tối đa 24 giờ kể từ thời điểm đăng nhập.</p>
                <p>// Để thay đổi trực tiếp thông tin tài khoản hoặc mật khẩu Master, vui lòng chỉnh sửa bảng "admins" trong file SQL.</p>
            </div>
        </div>
    );
};

export default AccountManager;
