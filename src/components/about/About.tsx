'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(titleRef.current, {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 90%'
                }
            });

            // Text Animation
            gsap.from(textRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.9,
                delay: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 90%'
                }
            });

            // Parallax Image
            gsap.to(imageRef.current, {
                yPercent: 12,
                scale: 1.15,
                ease: 'none',
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Reveal Image
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
                        start: 'top 85%'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Fast 3D Tilt
    const handleImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        // ❗ فرق مهم: شيل القسمة
        const x = clientX - left - width / 2;
        const y = clientY - top - height / 2;

        gsap.to(currentTarget, {
            x: x * 0.15,
            y: y * 0.15,
            rotateX: -y * 0.05,
            rotateY: x * 0.05,
            duration: 0.3,
            ease: 'power2.out'
        });

        gsap.to('.glare', {
            x: x * 0.1,
            y: y * 0.1,
            opacity: 0.25,
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

        gsap.to('.glare', {
            opacity: 0,
            duration: 0.3
        });
    };

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-10 md:py-20 overflow-hidden bg-[#0a0a0a]"
        >
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                <div className="absolute top-1/2 left-[-10%] w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 px-8 items-center">
                {/* Content */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            About Me
                        </div>

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

                    <div className="space-y-6">
                        <p
                            ref={textRef}
                            className="text-gray-400 text-lg md:text-xl leading-relaxed font-light"
                        >
                            I&apos;m a{' '}
                            <span className="text-white font-medium italic">
                                Frontend Developer
                            </span>{' '}
                            focused on building fast, interactive, and visually polished web
                            experiences. I turn complex ideas into smooth, scalable interfaces using
                            modern tools like React and advanced animation techniques.
                        </p>

                        <p className="text-gray-500 text-base leading-relaxed border-l border-blue-500/30 pl-6 italic">
                            &ldquo;I care about performance, clean architecture, and details that
                            most people don&apos;t notice — but everyone feels.&rdquo;
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-8 pt-6">
                        <div>
                            <p className="text-3xl font-bold text-white mb-1 antonio-font tracking-tighter">
                                02+
                            </p>
                            <p className="text-xs uppercase tracking-widest text-gray-500">
                                Years Exp
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white mb-1 antonio-font tracking-tighter">
                                15+
                            </p>
                            <p className="text-xs uppercase tracking-widest text-gray-500">
                                Projects Done
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div className="flex justify-center lg:justify-start">
                    <div
                        ref={imageContainerRef}
                        onMouseMove={handleImageMove}
                        onMouseLeave={handleImageLeave}
                        className="group relative w-full max-w-112.5 aspect-4/5 rounded-2xl overflow-hidden bg-[#111] border border-white/5 shadow-2xl transition-all duration-300 hover:border-blue-500/30"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <Image
                            ref={imageRef}
                            src="/image/IMG-20251221-WA0001-2.png"
                            alt="Mahmoud"
                            fill
                            className="object-cover scale-110 lg:grayscale lg:group-hover:grayscale-0 group-hover:scale-105 transition duration-500 ease-out"
                        />

                        {/* Glare */}
                        <div className="glare absolute inset-0 bg-white/20 opacity-0 pointer-events-none blur-3xl" />

                        {/* Gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
