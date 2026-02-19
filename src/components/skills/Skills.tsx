'use client';

import { motion } from 'framer-motion';
import { FaBootstrap, FaCss3Alt, FaGitAlt, FaGithub, FaHtml5, FaJs, FaReact } from 'react-icons/fa';

import {
    SiNextdotjs,
    SiPostman,
    SiReacthookform,
    SiRedux,
    SiSass,
    SiStrapi,
    SiTailwindcss,
    SiTypescript
} from 'react-icons/si';

const skills = [
    // Core
    { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },

    // Frameworks
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },

    // Styling
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Sass', icon: SiSass, color: '#CC6699' },
    { name: 'Bootstrap', icon: FaBootstrap, color: '#7952B3' },

    // State Management
    { name: 'Redux Toolkit', icon: SiRedux, color: '#764ABC' },

    // Backend & CMS
    { name: 'Strapi', icon: SiStrapi, color: '#4945FF' },

    // Auth & Forms
    { name: 'NextAuth', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'React Hook Form', icon: SiReacthookform, color: '#EC5990' },

    // Tools
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub', icon: FaGithub, color: '#FFFFFF' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' }
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
};

const Skills = () => {
    return (
        <section id="skills" className="relative py-24 bg-[#111111] overflow-hidden">
            {/* Background blur effect */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-12">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center satisfy-font gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        My Skills
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                            TOOLS FOR MY <br /> CREATIVE WORK
                        </span>
                    </h2>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full flex-1"
                >
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                transition={{ duration: 0.5 }}
                                className="group relative p-px rounded-2xl bg-linear-to-r from-blue-500/20 to-indigo-500/20"
                            >
                                {/* Card */}
                                <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-8 flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                                    {/* Icon */}
                                    <Icon
                                        size={40}
                                        style={{ color: skill.color }}
                                        className="mb-4 transition-transform duration-300 group-hover:scale-110"
                                    />

                                    {/* Skill Name */}
                                    <p className="text-sm font-semibold text-white tracking-wide">
                                        {skill.name}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
