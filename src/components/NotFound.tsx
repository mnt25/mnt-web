import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-500 blur-[60px] opacity-20 rounded-full"></div>
        <AlertCircle className="relative w-24 h-24 text-blue-500 animate-bounce" />
      </div>

      <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-6">
        Trang không tồn tại
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-10 text-lg">
        Rất tiếc, trang bạn đang tìm kiếm không có ở đây hoặc đã bị di chuyển.
      </p>

      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1"
      >
        <Home className="w-5 h-5 mr-2" />
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
