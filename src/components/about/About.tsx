'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { projectLength } from '../projects/Projects';

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (
            !sectionRef.current ||
            !titleRef.current ||
            !textRef.current ||
            !imageWrapperRef.current ||
            !imageContainerRef.current
        )
            return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    once: true
                }
            });

            tl.from(titleRef.current, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }).from(
                textRef.current,
                {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                },
                '-=0.5'
            );

            gsap.to(imageWrapperRef.current, {
                yPercent: 10,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.fromTo(
                imageContainerRef.current,
                { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: imageContainerRef.current,
                        start: 'top 85%',
                        once: true
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { currentTarget, clientX, clientY } = e;
        const rect = currentTarget.getBoundingClientRect();

        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;

        gsap.to(currentTarget, {
            x: x * 0.1,
            y: y * 0.1,
            rotateX: -y * 0.03,
            rotateY: x * 0.03,
            duration: 0.3,
            ease: 'power3.out'
        });

        gsap.to(glareRef.current, {
            x: x * 0.08,
            y: y * 0.08,
            opacity: 0.2,
            duration: 0.3
        });
    };

    const handleImageLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
        });

        gsap.to(glareRef.current, {
            opacity: 0,
            duration: 0.3
        });
    };

    return (
        <section
            ref={sectionRef}
            id="about"
            aria-label="About Mahmoud"
            className="relative py-10 md:py-20 overflow-hidden bg-[#111111]"
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
                <div className="absolute top-1/2 left-[-10%] w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 px-8 items-center">
                {/* Content */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        {/* ✅ React Icon */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            About Me
                        </div>

                        {/* h2 animation */}
                        <h2
                            ref={titleRef}
                            className="text-5xl md:text-7xl font-black text-white leading-[1.1] antonio-font"
                        >
                            WHO IS <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-600">
                                MAHMOUD?
                            </span>
                        </h2>
                    </div>

                    <p
                        ref={textRef}
                        className="text-gray-400 text-md md:text-lg leading-relaxed font-light"
                    >
                        I&apos;m a{' '}
                        <span className="text-white font-medium italic">Front-End Developer</span>{' '}
                        focused on building fast, interactive, and visually polished web experiences
                        for businesses, brands, restaurants, cafés, and individuals who want to turn
                        their ideas into modern digital products. I work with technologies like
                        <span className="text-white font-medium italic">Next.js</span>,{' '}
                        <span className="text-white font-medium italic">React</span> and{' '}
                        <span className="text-white font-medium italic">Tailwind CSS</span> to
                        create responsive, user-friendly, and high-performance websites.
                    </p>

                    {/* blockquote */}
                    <blockquote className="text-gray-500 text-base leading-relaxed border-l border-blue-500/30 pl-6 italic">
                        &ldquo;What I enjoy most about this work is transforming ideas into real
                        experiences that people can interact with, benefit from, and
                        remember.&rdquo;
                    </blockquote>

                    {/* stats aria-label */}
                    <div
                        className="grid grid-cols-2 gap-8 pt-6"
                        role="list"
                        aria-label="Experience stats"
                    >
                        <div role="listitem">
                            <p className="text-3xl font-bold text-white mb-1 antonio-font tracking-tighter">
                                02+
                            </p>
                            <p className="text-xs uppercase tracking-widest text-gray-500">
                                Years Experience
                            </p>
                        </div>
                        <div role="listitem">
                            <p className="text-3xl font-bold text-white mb-1 antonio-font tracking-tighter">
                                {projectLength}+
                            </p>
                            <p className="text-xs uppercase tracking-widest text-gray-500">
                                Projects Done
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div className="flex justify-center">
                    <div
                        ref={imageContainerRef}
                        onMouseMove={handleImageMove}
                        onMouseLeave={handleImageLeave}
                        className="group relative w-full max-w-md aspect-4/5 rounded-2xl overflow-hidden border border-white/10 will-change-transform"
                        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                    >
                        <div ref={imageWrapperRef} className="w-full h-full">
                            {/* alt + sizes */}
                            <Image
                                src="/image/IMG-20251221-WA0001-2.png"
                                alt="Mahmoud — Frontend Developer"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                className="object-cover transition duration-500 lg:grayscale lg:group-hover:grayscale-0"
                            />
                        </div>

                        {/* Glare */}
                        <div
                            ref={glareRef}
                            aria-hidden="true"
                            className="absolute inset-0 bg-white/20 opacity-0 blur-3xl pointer-events-none"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
