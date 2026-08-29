import React, { createContext, useContext, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const defaultContext: ThemeContextType = {
    theme: 'dark',
    setTheme: () => {},
    toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'dark';
        const saved = localStorage.getItem('theme') as Theme | null;
        return saved === 'light' || saved === 'dark' ? saved : 'dark';
    });

    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const [transitionTheme, setTransitionTheme] = useState<Theme>('dark');

    const applyThemeToDOM = (newTheme: Theme) => {
        if (typeof window === 'undefined') return;
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const setTheme = (newTheme: Theme) => {
        if (newTheme === theme || isTransitioning) return;

        setIsTransitioning(true);
        setTransitionTheme(newTheme);

        // Giai đoạn 1 (0ms): 2 cánh khép từ 2 bên mép vào giữa (2/4 màn hình)
        requestAnimationFrame(() => {
            setIsClosed(true);
        });

        // Giai đoạn 2 (sau 340ms): 2 cánh đã gặp nhau ở giữa -> Đổi màu theme
        setTimeout(() => {
            setThemeState(newTheme);
            applyThemeToDOM(newTheme);

            // Giai đoạn 3 (sau 160ms): Mở 2 cánh từ giữa lùi về 2 bên
            setTimeout(() => {
                setIsClosed(false);

                // Giai đoạn 4 (sau 360ms): Hoàn tất và ẩn overlay
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 360);
            }, 160);
        }, 340);
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        applyThemeToDOM(theme);
    }, []);

    const isLightTarget = transitionTheme === 'light';

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}

            {/* Hiệu ứng 2 cánh cửa khép từ 2 bên vào giữa (2/4) rồi mở ngược lại */}
            {isTransitioning && (
                <div className="fixed inset-0 pointer-events-none z-[99999] select-none overflow-hidden">
                    {/* Cánh bên Trái (chiếm 2/4 = 50% màn hình bên trái) */}
                    <div
                        className={`fixed top-0 left-0 w-1/2 h-full transition-transform duration-320 ease-[cubic-bezier(0.16,1,0.3,1)] z-[100] ${
                            isLightTarget
                                ? 'bg-slate-50 border-r border-slate-200 shadow-2xl'
                                : 'bg-zinc-950 border-r border-zinc-800 shadow-2xl'
                        } ${isClosed ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        {/* Đường viền phát sáng nhẹ mép trong */}
                        <div
                            className={`absolute top-0 right-0 w-[1.5px] h-full ${
                                isLightTarget
                                    ? 'bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300 shadow-[0_0_12px_#f59e0b]'
                                    : 'bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_12px_#06b6d4]'
                            }`}
                        />
                    </div>

                    {/* Cánh bên Phải (chiếm 2/4 = 50% màn hình bên phải) */}
                    <div
                        className={`fixed top-0 right-0 w-1/2 h-full transition-transform duration-320 ease-[cubic-bezier(0.16,1,0.3,1)] z-[100] ${
                            isLightTarget
                                ? 'bg-slate-50 border-l border-slate-200 shadow-2xl'
                                : 'bg-zinc-950 border-l border-zinc-800 shadow-2xl'
                        } ${isClosed ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        {/* Đường viền phát sáng nhẹ mép trong */}
                        <div
                            className={`absolute top-0 left-0 w-[1.5px] h-full ${
                                isLightTarget
                                    ? 'bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300 shadow-[0_0_12px_#f59e0b]'
                                    : 'bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_12px_#06b6d4]'
                            }`}
                        />
                    </div>

                    {/* Icon Mặt Trời / Mặt Trăng phát sáng quang học ở chính giữa tâm điểm */}
                    <div
                        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-250 ease-out z-[100000] flex items-center justify-center ${
                            isLightTarget
                                ? 'bg-white border-amber-400/50 shadow-[0_0_40px_rgba(245,158,11,0.35)]'
                                : 'bg-zinc-900 border-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.35)]'
                        } border rounded-full p-5 sm:p-6 ${
                            isClosed
                                ? 'scale-100 opacity-100 rotate-0'
                                : 'scale-50 opacity-0 rotate-90'
                        }`}
                    >
                        {isLightTarget ? (
                            <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 animate-pulse drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                        ) : (
                            <Moon className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 animate-pulse drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                        )}
                    </div>
                </div>
            )}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    return useContext(ThemeContext);
};
