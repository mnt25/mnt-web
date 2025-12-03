import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import type { NavItem } from "../types/navitem";
import { useLocation, useNavigate } from "react-router-dom";

const navItems: NavItem[] = [
  { label: "Giới thiệu", href: "#about" },
  { label: "Kỹ năng", href: "#skills" },
  { label: "Dự án", href: "#projects" },
  { label: "Liên hệ", href: "#contact" },
];

type Theme = "light" | "dark" | "system";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark"); // Default to dark visually first
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Khởi tạo theme từ localStorage hoặc system
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setTheme("system");
      applyTheme("system");
    }
  }, []);

  const applyTheme = (selectedTheme: Theme) => {
    const root = window.document.documentElement;
    const isDark =
      selectedTheme === "dark" ||
      (selectedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

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
    setIsThemeMenuOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);

    // Nếu không phải trang chủ, chuyển về trang chủ trước
    if (location.pathname !== "/") {
      navigate("/");
      // Đợi navigate xong mới scroll (dùng timeout nhỏ)
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

    // Logic scroll tại trang chủ
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

  const renderThemeIcon = () => {
    if (theme === "light") return <Sun className="w-5 h-5 text-orange-500" />;
    if (theme === "dark") return <Moon className="w-5 h-5 text-blue-400" />;
    return <Monitor className="w-5 h-5 text-slate-500 dark:text-slate-400" />;
  };

  const getThemeLabel = () => {
    if (theme === "light") return "Sáng";
    if (theme === "dark") return "Tối";
    return "Hệ thống";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={scrollToTop}
          >
            <img
              src="/logo.ico"
              alt="Logo"
              className="h-8 w-8 grayscale brightness-0 dark:brightness-100 dark:invert"
            />
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              MNT
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Theme Toggle Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {renderThemeIcon()}
                <span className="w-20 inline-block">{getThemeLabel()}</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </button>

              {isThemeMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsThemeMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 z-20 overflow-hidden py-1 ring-1 ring-black ring-opacity-5">
                    <button
                      onClick={() => handleThemeChange("light")}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        theme === "light"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <Sun className="w-4 h-4 mr-3" />
                      Sáng
                    </button>
                    <button
                      onClick={() => handleThemeChange("dark")}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        theme === "dark"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <Moon className="w-4 h-4 mr-3" />
                      Tối
                    </button>
                    <button
                      onClick={() => handleThemeChange("system")}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        theme === "system"
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <Monitor className="w-4 h-4 mr-3" />
                      Theo hệ thống
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden gap-4">
            {/* Mobile Theme Toggle (Simple cycle) */}
            <button
              onClick={() => {
                const next =
                  theme === "light"
                    ? "dark"
                    : theme === "dark"
                    ? "system"
                    : "light";
                handleThemeChange(next);
              }}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {renderThemeIcon()}
            </button>

            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
