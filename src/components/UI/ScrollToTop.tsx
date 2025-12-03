import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Tính toán hiển thị
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Tính toán phần trăm cuộn
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cấu hình vòng tròn SVG
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="relative flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300 group"
        aria-label="Scroll to top"
      >
        {/* Progress Circle Border */}
        <svg
          className="absolute top-0 left-0 w-full h-full -rotate-90 transform pointer-events-none"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeWidth="2"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            className="stroke-blue-500 transition-all duration-100 ease-out"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="w-5 h-5 text-slate-700 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
      </button>
    </div>
  );
};

export default ScrollToTop;
