import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const themes = [
        { id: 'light', name: 'Sáng', icon: <Sun className="w-4 h-4" /> },
        { id: 'dark', name: 'Tối', icon: <Moon className="w-4 h-4" /> },
        { id: 'system', name: 'Hệ thống', icon: <Monitor className="w-4 h-4" /> },
    ] as const;

    return (
        <div className="flex p-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 w-fit">
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${theme === t.id
                            ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                >
                    {t.icon}
                    {t.name}
                </button>
            ))}
        </div>
    );
};

export default ThemeToggle;
