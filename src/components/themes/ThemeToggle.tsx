'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = requestAnimationFrame(() => {
            setMounted(true);
        });

        return () => cancelAnimationFrame(timer);
    }, []);
    if (!mounted) return <div className="p-2 w-9 h-9" />;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl transition-all cursor-pointer
                text-gray-700
            dark:text-black"
        >
            {theme === 'dark' ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
        </button>
    );
}
