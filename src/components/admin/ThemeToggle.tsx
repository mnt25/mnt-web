import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const themes = [
        { id: 'light', name: 'LIGHT', icon: <Sun className="w-3.5 h-3.5" /> },
        { id: 'dark', name: 'DARK', icon: <Moon className="w-3.5 h-3.5" /> },
    ] as const;

    return (
        <div className="flex p-0.5 bg-zinc-950 border border-zinc-800 rounded-none w-fit font-mono text-[10px] select-none">
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none font-bold uppercase transition-all duration-300 ${
                        theme === t.id
                            ? 'bg-blue-600/10 border-r border-l border-zinc-800/80 text-blue-400 font-extrabold shadow-[0_0_8px_rgba(59,130,246,0.15)]'
                            : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                >
                    {t.icon}
                    <span>{t.name}</span>
                </button>
            ))}
        </div>
    );
};

export default ThemeToggle;
