'use client';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Hero() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    useEffect(() => {
        const timer = requestAnimationFrame(() => {
            setMounted(true);
        });

        return () => cancelAnimationFrame(timer);
    }, []);
    if (!mounted) return <div className="p-2 w-9 h-9" />;

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/20 blur-[120px] rounded-full -z-10 animate-pulse delay-700" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10"
            >
                <motion.span
                    variants={itemVariants}
                    className={`inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full border transition-all duration-300 ${
                        theme === 'dark'
                            ? 'text-blue-400 bg-blue-900/30 border-blue-700'
                            : 'text-white bg-blue-600 border-blue-700 shadow-lg'
                    }`}
                >
                    Available for new projects
                </motion.span>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-8xl font-black mb-6 tracking-tight text-foreground"
                >
                    I&apos;m{' '}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">
                        Mahmoud.
                    </span>
                </motion.h1>

                <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-6xl font-bold mb-8 leading-tight text-foreground/90"
                >
                    Crafting Modern Digital <br className="hidden md:block" /> Experiences.
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed text-foreground/70"
                >
                    A <span className="font-semibold text-foreground">Frontend Developer</span>{' '}
                    dedicated to building fast, accessible, and visually stunning web applications
                    with{' '}
                    <span className="underline decoration-blue-500 underline-offset-4">
                        Next.js 16
                    </span>
                    .
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                    <a
                        href="#projects"
                        className="group relative px-8 py-4 bg-foreground text-background rounded-2xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                        View My Projects
                    </a>

                    <a
                        href="#contact"
                        className="px-8 py-4 border-2 border-slate-200 dark:border-slate-800 text-foreground rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-95"
                    >
                        Let&apos;s Talk
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
            >
                <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-slate-400 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
