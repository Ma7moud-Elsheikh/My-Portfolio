'use client';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-blue-600 font-medium mb-4">Hi, my name is</h2>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    Mahmoud Elsheikh.
                </h1>
                <h3 className="text-4xl md:text-6xl font-bold text-gray-500 dark:text-gray-400 mb-8">
                    I build things for the web.
                </h3>
                <p className="max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-10">
                    I’m a Frontend Developer specializing in building (and occasionally designing)
                    exceptional digital experiences using{' '}
                    <span className="text-blue-600">Next.js</span> and{' '}
                    <span className="text-blue-600">Tailwind CSS</span>.
                </p>

                <div className="flex gap-4 justify-center">
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all"
                    >
                        View My Work
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-600/10 transition-all"
                    >
                        Contact Me
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
