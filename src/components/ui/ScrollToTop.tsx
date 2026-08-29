import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 transition-all duration-300 transform ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-6 opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="relative flex items-center justify-center w-11 h-11 bg-white/90 dark:bg-zinc-900/90 rounded-full border border-black/10 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/30 hover:scale-105 transition-all duration-200 group backdrop-blur-md"
        aria-label="Scroll to top"
        title="Cuộn lên đầu trang"
      >
        {/* Progress Circle Border */}
        <svg
          className="absolute top-0 left-0 w-full h-full -rotate-90 transform pointer-events-none"
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            className="stroke-black/5 dark:stroke-white/10"
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            className="stroke-cyan-500 transition-all duration-100 ease-out"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="w-4 h-4 text-zinc-700 dark:text-zinc-300 group-hover:text-cyan-500 transition-colors" />
      </button>
    </div>
  );
};

export default ScrollToTop;
