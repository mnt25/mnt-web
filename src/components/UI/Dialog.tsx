import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    title,
    children,
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Dialog Panel with Glowing Cyber Accents */}
            <div
                className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-950 p-6 text-left align-middle shadow-[0_0_50px_rgba(0,0,0,0.8)] dark:shadow-[0_0_50px_rgba(6,182,212,0.05)] transition-all border border-slate-200 dark:border-cyan-500/20 animate-in fade-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
            >
                {/* Visual Neon Top Border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

                <div className="flex items-center justify-between mb-4 mt-1">
                    {title && (
                        <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-slate-800 dark:text-cyan-400">
                            {title}
                        </h3>
                    )}
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-900/60 text-slate-500 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-cyan-400 border border-transparent dark:hover:border-zinc-800/80 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="mt-2">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
