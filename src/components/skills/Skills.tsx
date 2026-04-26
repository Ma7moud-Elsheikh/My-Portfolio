'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { FaBootstrap, FaCss3Alt, FaGithub, FaHtml5, FaJs, FaReact, FaRocket } from 'react-icons/fa';

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

type SkillCardRef = HTMLDivElement | null;

const skills = [
    { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Sass', icon: SiSass, color: '#CC6699' },
    { name: 'Bootstrap', icon: FaBootstrap, color: '#7952B3' },
    { name: 'Redux Toolkit', icon: SiRedux, color: '#764ABC' },
    { name: 'Strapi', icon: SiStrapi, color: '#4945FF' },
    { name: 'NextAuth', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'React Hook Form', icon: SiReacthookform, color: '#EC5990' },
    { name: 'GitHub', icon: FaGithub, color: '#FFFFFF' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { name: 'More Coming Soon...', icon: FaRocket, color: '#FFFFFF' }
];

const Skills = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: 50, filter: 'blur(15px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 85%'
                    }
                }
            );
        }

        if (gridRef.current) {
            const cards = gridRef.current.children;

            gsap.fromTo(
                cards,
                { opacity: 0, scale: 0.8, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%'
                    }
                }
            );
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: SkillCardRef) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(card, {
            x: x * 0.2,
            y: y * 0.2,
            rotateX: -y * 0.1,
            rotateY: x * 0.1,
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = (card: SkillCardRef) => {
        if (!card) return;

        gsap.to(card, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
        });
    };

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-10 md:py-20 bg-[#0a0a0a] overflow-hidden"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/10 blur-[150px] rounded-full -z-10" />

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-12 px-6">
                <div ref={headerRef} className="flex-1 sticky lg:top-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        My Skills
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                        <span className="text-transparent uppercase bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500">
                            Tools For My <br /> Creative Work
                        </span>
                    </h2>
                </div>

                <div ref={gridRef} className="grid gap-4 grid-cols-2 sm:grid-cols-3 w-full flex-1">
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;

                        return (
                            <div
                                key={index}
                                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                                className="group relative perspective-1000"
                            >
                                <div className="rounded-2xl border border-white/5 bg-white/3 backdrop-blur-md p-6 h-32 flex flex-col items-center justify-center transition-colors duration-300 group-hover:bg-white/8 group-hover:border-white/20">
                                    <Icon
                                        size={35}
                                        style={{ color: skill.color }}
                                        className="mb-3"
                                    />
                                    <p className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                                        {skill.name}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
