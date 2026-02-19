'use client';

import { motion } from 'framer-motion';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(20px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { staggerChildren: 0.2, duration: 0.8 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } }
    };

    return (
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-background">
            {/* Background blobs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 blur-[130px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 blur-[130px] rounded-full -z-10 animate-pulse delay-700" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="z-10"
            >
                {/* Badge */}
                <motion.span
                    variants={itemVariants}
                    className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full border border-blue-500/30 text-blue-400 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                >
                    Mid-Level Frontend Developer
                </motion.span>

                {/* Main Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-8xl font-black mb-6 tracking-tight text-white"
                >
                    <span className="text-transparent antonio-font bg-clip-text bg-linear-to-r from-blue-500 to-indigo-400">
                        Mahmoud El-sheikh
                    </span>
                </motion.h1>

                {/* Subheading */}
                <motion.h2
                    variants={itemVariants}
                    className="mb-8 text-2xl font-bold leading-tight md:text-4xl text-slate-200"
                >
                    Crafting Modern Digital Experiences.
                </motion.h2>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="mb-10 max-w-xl ms-auto me-auto text-lg text-slate-400 leading-relaxed"
                >
                    I build fast, accessible, and scalable web applications using React and Next.js
                    with a strong focus on performance and UX.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                    <a
                        href="#projects"
                        className="group relative px-8 py-4 bg-white text-black rounded-2xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                    >
                        View My Projects
                    </a>

                    <a
                        href="#contact"
                        className="px-8 py-4 border border-slate-700 text-white rounded-2xl font-bold hover:bg-white/5 transition-all active:scale-95"
                    >
                        Let&apos;s Talk
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
            >
                <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}

export default Hero;
