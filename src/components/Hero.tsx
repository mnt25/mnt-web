import React from "react";
import { ArrowRight, Download } from "lucide-react";
import { Reveal } from "./UI/Reveal";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        <Reveal width="fit-content">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400 mr-2 animate-pulse"></span>
            Đang tìm kiếm cơ hội thực tập
          </div>
        </Reveal>

        <Reveal>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Xin chào, tôi là
            <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 pl-2">
              Phạm Văn Sơn
            </span>
          </h1>
        </Reveal>

        <Reveal>
          <p className="mt-4 max-w-2xl text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed mx-auto">
            Tốt nghiệp chuyên ngành Công nghệ thông tin, đam mê xây dựng các ứng
            dụng web hiện đại, tối ưu trải nghiệm người dùng.
          </p>
        </Reveal>

        <Reveal width="fit-content">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-1">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:text-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              Xem Dự Án
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="https://drive.usercontent.google.com/u/0/uc?id=1RCmUUR_dGM_cqi3NtHRvMyeiZ2ytsZ7O&export=download"
              download
              className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 dark:border-slate-700 text-base font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-white md:text-lg transition-all backdrop-blur-sm hover:-translate-y-1 "
            >
              Tải CV
              <Download className="ml-2 h-5 w-5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
