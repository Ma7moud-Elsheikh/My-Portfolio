'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    return (
        <section id="about" className="relative py-24 px-6 bg-background overflow-hidden">
            {/* Background blur blob */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Text Content Side */}
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1"
                >
                    <div className="inline-flex items-center satisfy-font gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        About Me
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                        +2 Years of Experience <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                            Digital Reality
                        </span>
                    </h2>

                    <p className="text-white text-sm font-light leading-loose tracking-[2px] capitalize max-w-175">
                        Mid-Level Frontend Developer passionate about creating clean, responsive,
                        and user-friendly web applications; experienced in{' '}
                        <span className="text-white border-b border-blue-500/50">React</span> and{' '}
                        <span className="text-white border-b border-blue-500/50">Next.js</span>,
                        enjoys turning complex ideas into simple and visually appealing interfaces
                        while writing maintainable and scalable code, and always eager to learn new
                        technologies, improve performance, and contribute to collaborative projects
                        that make an impact.
                    </p>
                </motion.div>

                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: 'blur(20px)', scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 relative group hidden lg:flex justify-center"
                >
                    <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-colors duration-500 group-hover:border-blue-500/30">
                        <div className="w-full max-w-87.5 aspect-4/5 rounded-4xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                            <Image
                                src="/image/IMG-20251221-WA0001-2.png"
                                alt="Mahmoud"
                                width={400}
                                height={500}
                                priority
                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Decorative blobs */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/20 blur-3xl -z-10 animate-pulse" />
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-600/20 blur-3xl -z-10" />
                </motion.div>
            </div>
        </section>
    );
};

export default About;
