import React, { createContext, useContext, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme') as Theme | null;
        return saved === 'light' || saved === 'dark' ? saved : 'dark';
    });

    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [transitionTheme, setTransitionTheme] = useState<Theme>('dark');

    const setTheme = (newTheme: Theme) => {
        if (newTheme === theme || isTransitioning) return;

        setIsTransitioning(true);
        setTransitionTheme(newTheme);
        
        // Khởi chạy hoạt ảnh đóng tấm che (curtain closes)
        setTimeout(() => {
            setShowContent(true);
        }, 20);

        // Sau 500ms (hai tấm che gặp nhau ở giữa màn hình), chuyển đổi theme thực tế
        setTimeout(() => {
            setThemeState(newTheme);
        }, 500);

        // Sau 950ms, mở lại tấm che (curtain opens)
        setTimeout(() => {
            setShowContent(false);
        }, 950);

        // Sau 1450ms, dọn dẹp và kết thúc quá trình chuyển tiếp
        setTimeout(() => {
            setIsTransitioning(false);
        }, 1450);
    };

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (targetTheme: Theme) => {
            root.classList.remove('light', 'dark');
            root.classList.add(targetTheme);
        };

        applyTheme(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
            {isTransitioning && (
                <div className="fixed inset-0 pointer-events-none z-[99999] flex">
                    {/* Tấm che bên trái (Left Shutter) */}
                    <div 
                        className={`fixed top-0 left-0 w-1/2 h-full ${
                            transitionTheme === 'light' 
                                ? 'bg-slate-50 border-r border-slate-200' 
                                : 'bg-zinc-950 border-r border-zinc-900'
                        } transition-transform duration-500 ease-in-out pointer-events-auto ${
                            showContent ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        {/* Họa tiết chấm bi liti nền */}
                        <div className={`absolute inset-0 pointer-events-none ${
                            transitionTheme === 'light'
                                ? 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] opacity-50'
                                : 'bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] opacity-85'
                        } [background-size:12px_12px]`} />
                        
                        {/* Đường sáng viền mép trong (Glowing edge) */}
                        <div className={`absolute top-0 right-0 w-0.5 h-full ${
                            transitionTheme === 'light'
                                ? 'bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300 shadow-[0_0_8px_#f59e0b]'
                                : 'bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_8px_#06b6d4]'
                        }`} />
                    </div>
                    {/* Tấm che bên phải (Right Shutter) */}
                    <div 
                        className={`fixed top-0 right-0 w-1/2 h-full ${
                            transitionTheme === 'light' 
                                ? 'bg-slate-50 border-l border-slate-200' 
                                : 'bg-zinc-950 border-l border-zinc-900'
                        } transition-transform duration-500 ease-in-out pointer-events-auto ${
                            showContent ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        {/* Họa tiết chấm bi liti nền */}
                        <div className={`absolute inset-0 pointer-events-none ${
                            transitionTheme === 'light'
                                ? 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] opacity-50'
                                : 'bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] opacity-85'
                        } [background-size:12px_12px]`} />
                        
                        {/* Đường sáng viền mép trong (Glowing edge) */}
                        <div className={`absolute top-0 left-0 w-0.5 h-full ${
                            transitionTheme === 'light'
                                ? 'bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300 shadow-[0_0_8px_#f59e0b]'
                                : 'bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_8px_#06b6d4]'
                        }`} />
                    </div>
                    {/* Icon chuyển đổi ở chính giữa (Center Transition Icon) */}
                    <div 
                        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out z-[100000] flex items-center justify-center ${
                            transitionTheme === 'light' 
                                ? 'bg-white border-slate-200 shadow-slate-200/50' 
                                : 'bg-zinc-900 border-zinc-800 shadow-black/80'
                        } border rounded-full p-6 shadow-2xl ${
                            showContent ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'
                        }`}
                    >
                        {transitionTheme === 'light' ? (
                            <Sun className="w-12 h-12 text-amber-500 animate-pulse drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
                        ) : (
                            <Moon className="w-12 h-12 text-indigo-400 animate-pulse drop-shadow-[0_0_15px_rgba(129,140,248,0.6)]" />
                        )}
                    </div>
                    {/* Chữ trạng thái công nghệ dưới Icon (Tech status text) */}
                    <div 
                        className={`fixed top-[calc(50%+70px)] left-1/2 -translate-x-1/2 z-[100000] font-mono text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-center select-none uppercase transition-all duration-300 delay-100 ${
                            showContent ? 'scale-100 opacity-80' : 'scale-90 opacity-0'
                        } ${
                            transitionTheme === 'light'
                                ? 'text-slate-500 drop-shadow-[0_0_5px_rgba(100,116,139,0.3)]'
                                : 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                        } animate-pulse`}
                    >
                        {transitionTheme === 'light' ? 'INIT_LIGHT_INTERFACE' : 'LOAD_DARK_INTERFACE'}
                    </div>
                </div>
            )}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
