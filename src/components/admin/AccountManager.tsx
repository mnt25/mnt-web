import { useState, useEffect } from "react";
import { UserCog, Palette } from "lucide-react";
import { api } from "../../../server/api";
import ThemeToggle from "./ThemeToggle";

const AccountManager = () => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchStatus = async () => {
            const data = await api.getAccountStatus();
            setIsEnabled(data.enabled);
        };
        fetchStatus();
    }, []);

    const handleToggle = async () => {
        const nextState = !isEnabled;
        const success = await api.updateAccountStatus(nextState);

        if (success) {
            setIsEnabled(nextState);
            setMessage("Đã cập nhật cài đặt tài khoản!");
            setTimeout(() => setMessage(""), 2500);
        } else {
            setMessage("Lỗi khi cập nhật!");
        }
    };

    return (
        <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Cài đặt tài khoản
            </h2>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow space-y-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <UserCog className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">Quyền hạn & Truy cập</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Quản lý các tính năng công khai của bạn</p>
                    </div>
                </div>

                {/* Toggle Switch */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                    <div>
                        <span className="block font-medium text-slate-700 dark:text-slate-200">
                            Cho phép tải CV
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Khi tắt, người dùng sẽ không thể lấy được link CV từ API.
                        </p>
                    </div>
                    <button
                        onClick={handleToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isEnabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>

                {/* Appearance Settings */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                            <Palette className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Giao diện</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Tùy chỉnh chế độ hiển thị</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                        <div>
                            <span className="block font-medium text-slate-700 dark:text-slate-200">
                                Chế độ hiển thị
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Chọn giữa giao diện Sáng, Tối hoặc theo Hệ thống.
                            </p>
                        </div>
                        <ThemeToggle />
                    </div>
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

export default AccountManager;
