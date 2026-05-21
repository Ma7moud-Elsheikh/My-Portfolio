'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Project {
    title: string;
    image: string;
    live: string;
    features: string[];
}

const projects: Project[] = [
    {
        title: 'Cure Booking App',
        image: '/projects/Cure-homePage.png',
        live: 'https://r7-react-cure-2-8lbg.vercel.app/',
        features: ['React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Chadcn UI']
    },
    {
        title: 'EACR',
        image: '/projects/EACR-EG.png',
        live: 'https://eacr-eg.org/en',
        features: ['JavaScript', 'HTML', 'CSS']
    },
    {
        title: 'DecoStyle',
        image: '/projects/DecoStyle.png',
        live: 'https://deco-style.vercel.app/',
        features: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'Framer Motion']
    },
    {
        title: 'ToDo App',
        image: '/projects/ToDo.png',
        live: 'https://to-do-list-pro-version.vercel.app/',
        features: ['JavaScript', 'HTML', 'CSS']
    },
    {
        title: 'Design Patterns',
        image: '/projects/DesignPatterns.png',
        live: 'https://design-pattern-two.vercel.app',
        features: ['JavaScript', 'HTML', 'CSS']
    },
    {
        title: 'Dashboard',
        image: '/projects/dashboard.png',
        live: 'https://dashboard-primary.vercel.app/',
        features: ['JavaScript', 'HTML', 'CSS', 'Bootstrap']
    },
    {
        title: 'American Academy',
        image: '/projects/AmericanAcademy.png',
        live: 'https://american-academy-zeta.vercel.app/',
        features: ['JavaScript', 'HTML', 'CSS', 'Bootstrap']
    },
    {
        title: 'CRUD System',
        image: '/projects/CRUD.png',
        live: 'https://crud-jet-ten.vercel.app/',
        features: ['JavaScript', 'HTML', 'CSS']
    },
    {
        title: 'Image Filter',
        image: '/projects/filter-img.png',
        live: 'https://filter-img-seven.vercel.app/',
        features: ['JavaScript', 'HTML', 'CSS']
    },
    {
        title: 'Digital Ideas',
        image: '/projects/DigitalIdeas.png',
        live: 'https://digital-idea-jet.vercel.app/',
        features: ['JavaScript', 'HTML', 'CSS', 'Bootstrap']
    }
];

const Projects: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);

    const mouseXRef = useRef<number[]>([0, 0, 0, 0, 0]);
    const mouseYRef = useRef<number[]>([0, 0, 0, 0, 0]);
    const currentXRef = useRef<number[]>([0, 0, 0, 0, 0]);
    const currentYRef = useRef<number[]>([0, 0, 0, 0, 0]);
    const rafIdRef = useRef<number | null>(null);
    const activeIndexRef = useRef<number | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!gridRef.current || !titleRef.current) return;

        const cards = gsap.utils.toArray('.project-card');

        gsap.fromTo(
            cards,
            { opacity: 0, y: 100, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: 'back.out(0.7)',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 80, filter: 'blur(10px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 90%'
                }
            }
        );

        return () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    const animateCursor = (index: number) => {
        const cursor = cursorRefs.current[index];
        if (!cursor) return;

        const ease = 0.1;

        currentXRef.current[index] +=
            (mouseXRef.current[index] - currentXRef.current[index]) * ease;
        currentYRef.current[index] +=
            (mouseYRef.current[index] - currentYRef.current[index]) * ease;

        cursor.style.left = currentXRef.current[index] + 'px';
        cursor.style.top = currentYRef.current[index] + 'px';

        rafIdRef.current = requestAnimationFrame(() => animateCursor(index));
    };

    const startAnimation = (index: number) => {
        if (rafIdRef.current && activeIndexRef.current !== index) {
            cancelAnimationFrame(rafIdRef.current);
        }
        activeIndexRef.current = index;
        animateCursor(index);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseXRef.current[index] = e.clientX - rect.left;
        mouseYRef.current[index] = e.clientY - rect.top;

        if (!rafIdRef.current || activeIndexRef.current !== index) {
            startAnimation(index);
        }
    };

    const handlePointerEnter = (index: number) => {
        setHoveredIndex(index);

        if (cursorRefs.current[index]) {
            const rect = cursorRefs.current[index]?.parentElement?.getBoundingClientRect();
            if (rect) {
                currentXRef.current[index] = mouseXRef.current[index];
                currentYRef.current[index] = mouseYRef.current[index];
            }
        }
    };

    const handlePointerLeave = (index: number) => {
        setHoveredIndex(null);

        if (rafIdRef.current && activeIndexRef.current === index) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
            activeIndexRef.current = null;
        }
    };

    return (
        <section
            aria-label="Projects Portfolio"
            className="relative py-10 md:py-20 bg-[#111111] overflow-hidden"
        >
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full -z-10" />

            <div className="max-w-6xl mx-auto flex flex-col gap-12 px-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Portfolio
                    </div>

                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4"
                    >
                        <span className="text-transparent uppercase bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500">
                            Take a look <br /> at my work
                        </span>
                    </h2>
                </div>

                <div ref={gridRef} className="grid gap-8 grid-cols-1 md:grid-cols-2">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card group relative rounded-3xl overflow-hidden border border-white/5 bg-white/2 transition-all duration-500 hover:border-white/20 lg:hover:scale-[1.02]"
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onPointerEnter={() => handlePointerEnter(index)}
                            onPointerLeave={() => handlePointerLeave(index)}
                        >
                            <Link
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.title} project`}
                                title={project.title}
                            >
                                <div className="relative w-full h-75 md:h-100 overflow-hidden">
                                    {/* Custom cursor */}
                                    <div className="hidden lg:block pointer-events-none absolute inset-0 z-30 overflow-hidden">
                                        <div
                                            ref={(el) => {
                                                cursorRefs.current[index] = el;
                                            }}
                                            className={`absolute w-26 h-26 rounded-full flex items-center justify-center transition-opacity duration-300 ${
                                                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                            }`}
                                            style={{
                                                left: 0,
                                                top: 0,
                                                transform: 'translate(-50%, -50%)',
                                                background:
                                                    'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
                                                boxShadow: '0 0 30px rgba(255,255,255,0.5)'
                                            }}
                                        >
                                            <span className="text-black text-xs font-black tracking-widest uppercase">
                                                View
                                            </span>
                                        </div>
                                    </div>

                                    {/* ✅ Image مع sizes صح + lazy loading */}
                                    <Image
                                        src={project.image}
                                        alt={`Screenshot of ${project.title} project`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        style={{ objectFit: 'cover' }}
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        priority={index === 0}
                                        loading={index === 0 ? undefined : 'lazy'}
                                    />

                                    <div className="absolute lg:hidden inset-0 bg-linear-to-t from-black via-black/70 to-black/30" />
                                    <div className="hidden lg:block absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/90 opacity-0 group-hover:opacity-100 transition-all duration-700" />

                                    {/* Project info */}
                                    <div
                                        className={`absolute bottom-0 left-0 p-6 md:p-8 w-full z-20 transition-all duration-500 ${
                                            hoveredIndex === index
                                                ? 'lg:translate-y-0 lg:opacity-100'
                                                : 'lg:translate-y-4 lg:opacity-0'
                                        }`}
                                    >
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                            {project.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-2">
                                            {project.features.map((feature, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-md bg-black/60 backdrop-blur-md text-white/90 border border-white/20"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
export const projectLength = projects.length;
