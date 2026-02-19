'use client';

import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

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
        <section className="relative min-h-[50vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
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
                <motion.a
                    variants={itemVariants}
                    href="/Mahmoud-ElSheikh-CV.pdf"
                    download
                    className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold tracking-wide text-white rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1"
                >
                    <FaDownload className="text-xl" />
                    Download CV
                </motion.a>
            </motion.div>


        </section>
    );
};

export default Hero;
