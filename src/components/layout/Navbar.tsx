import React, { useState, useEffect } from "react";
import { Sun, Moon, User, Code, Briefcase, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { key: "nav.about", href: "#about", icon: User },
  { key: "nav.skills", href: "#skills", icon: Code },
  { key: "nav.projects", href: "#projects", icon: Briefcase },
  { key: "nav.contact", href: "#contact", icon: Mail },
];

type Theme = "light" | "dark";

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<Theme>("dark");
  const [isAvatarVisible, setIsAvatarVisible] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsAvatarVisible(false);
      return;
    }

    const avatarElement = document.getElementById("hero-avatar");
    if (!avatarElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsAvatarVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px"
      }
    );

    observer.observe(avatarElement);

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  const applyTheme = (selectedTheme: Theme) => {
    const root = window.document.documentElement;
    const isDark = selectedTheme === "dark";

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", selectedTheme);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
      return;
    }

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isDarkMode = theme === "dark";

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className={`flex-shrink-0 flex items-center gap-2 cursor-pointer transition-all duration-300 ${isAvatarVisible && location.pathname === "/"
                  ? "opacity-0 scale-95 pointer-events-none"
                  : "opacity-100 scale-100"
                }`}
              onClick={scrollToTop}
            >
              <div className="icon-logo h-12 w-12">
                <svg viewBox="0 0 304 304" className="w-full h-full" fill="none">
                  {/* Perfectly Round Circle with Bold Continuous Stroke */}
                  <circle
                    cx={152}
                    cy={152}
                    r={145}
                    fill="none"
                    pathLength={1000}
                  />
                  {/* Original bold letter outline paths P and S */}
                  <path
                    d="M 90 224 V 80 H 115 C 129 80 140 96 140 116 C 140 136 129 152 115 152 H 108 M 218 85 C 211 81 201 79 186 83 C 174 87 160 96 160 122 C 160 136 173 152 187 152 C 201 152 214 168 214 188 C 214 208 201 224 188 225 C 176.6667 225 165.3333 225 151 220 M 244 157 L 232 153 M 250 200 L 243 208M 90 224 V 80 H 115 C 129 80 140 96 140 116 C 140 136 129 152 115 152 H 110 M 218 85 C 211 81 201 79 186 82 C 173 87 160 96 160 122 C 161 136 173 149 189 153 C 199 157 216 165 215 192 C 214 208 201 224 188 225 C 176.6667 225 165.3333 225 142 220 M 239 156 L 232 153 M 249 201 L 237 213"
                    fill="none"
                    pathLength={1000}
                  />
                </svg>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-baseline space-x-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      {t(item.key)}
                    </a>
                  );
                })}
              </div>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Theme Toggle Switch */}
              <button
                onClick={() => handleThemeChange(isDarkMode ? "light" : "dark")}
                className="relative inline-flex items-center h-8 w-16 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none border border-slate-300 dark:border-slate-600 shrink-0"
                aria-label="Toggle theme"
              >
                <span className="sr-only">Toggle theme</span>
                <div className="absolute w-full flex justify-between px-1.5 pointer-events-none">
                  <Sun className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <Moon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </div>
                <span
                  className={`relative inline-flex items-center justify-center w-6 h-6 transform rounded-full bg-white dark:bg-slate-800 shadow-md transition-transform duration-300 ease-in-out z-10 ${isDarkMode ? 'translate-x-9' : 'translate-x-1'
                    }`}
                >
                  {isDarkMode ? (
                    <Moon className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-orange-500" />
                  )}
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden gap-4 items-center">
              <LanguageSwitcher />
              {/* Mobile Theme Toggle Switch */}
              <button
                onClick={() => handleThemeChange(isDarkMode ? "light" : "dark")}
                className="relative inline-flex items-center h-8 w-16 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none border border-slate-300 dark:border-slate-600 shrink-0"
                aria-label="Toggle theme"
              >
                <span className="sr-only">Toggle theme</span>
                <div className="absolute w-full flex justify-between px-1.5 pointer-events-none">
                  <Sun className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <Moon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </div>
                <span
                  className={`relative inline-flex items-center justify-center w-6 h-6 transform rounded-full bg-white dark:bg-slate-800 shadow-md transition-transform duration-300 ease-in-out z-10 ${isDarkMode ? 'translate-x-9' : 'translate-x-1'
                    }`}
                >
                  {isDarkMode ? (
                    <Moon className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-orange-500" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-slate-200/80 dark:border-zinc-800/80 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all duration-200"
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">{t(item.key)}</span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
