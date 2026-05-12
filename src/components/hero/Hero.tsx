'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import {
    FaDownload,
    FaEnvelope,
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin
} from 'react-icons/fa';

const Hero: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const badgeRef = useRef<HTMLSpanElement>(null);
    const subBadgeRef = useRef<HTMLSpanElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            tl.fromTo(
                '.hero-blob',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2, stagger: 0.5 },
                0
            );

            tl.fromTo(
                [badgeRef.current, subBadgeRef.current],
                { y: -30, opacity: 0, filter: 'blur(10px)' },
                { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
                0.3
            );

            tl.fromTo(
                titleRef.current,
                { y: 100, opacity: 0, skewY: 7 },
                { y: 0, opacity: 1, skewY: 0, duration: 1.5 },
                0.6
            );

            tl.fromTo(
                descRef.current,
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
                0.9
            );

            tl.fromTo(
                '.social-icon',
                { scale: 0, rotation: -45, opacity: 0 },
                { scale: 1, rotation: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                1.2
            );

            tl.fromTo(
                buttonRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' },
                1.5
            );

            gsap.to('.hero-blob', {
                y: 'random(-40, 40)',
                x: 'random(-40, 40)',
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMagnetic = (e: React.MouseEvent<HTMLElement>) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(currentTarget, {
            x: gsap.utils.clamp(-10, 10, x * 0.2),
            y: gsap.utils.clamp(-10, 10, y * 0.2),
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    const resetMagnetic = (e: React.MouseEvent<HTMLElement>) => {
        gsap.to(e.currentTarget, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)'
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-[#0a0a0a]"
        >
            {/* Background Blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="hero-blob absolute top-[10%] left-[20%] w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="hero-blob absolute bottom-[10%] right-[20%] w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <div className="z-10 flex flex-col items-center">
                {/* Badges */}
                <span
                    ref={badgeRef}
                    className="mb-4 inline-block px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase rounded-full border border-blue-500/20 text-blue-400 bg-blue-500/5 backdrop-blur-sm"
                >
                    Available For Work
                </span>

                {/* Title */}
                <div className="overflow-hidden mb-6">
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-8xl font-black tracking-tighter text-white antonio-font"
                    >
                        MAHMOUD{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-indigo-400 to-purple-500">
                            ELSHEIKH
                        </span>
                    </h1>
                </div>

                {/* Description */}
                <p
                    ref={descRef}
                    className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mb-10 leading-relaxed"
                >
                    Building modern, high-performance web applications with smooth interactions,
                    clean UI systems, and scalable frontend architecture.
                </p>

                {/* Social Icons */}
                <div ref={socialRef} className="flex items-center justify-center gap-5 mb-12">
                    {[
                        {
                            icon: <FaGithub />,
                            link: 'https://github.com/Ma7moud-Elsheikh',
                            color: 'hover:text-white'
                        },
                        {
                            icon: <FaLinkedin />,
                            link: 'https://www.linkedin.com/',
                            color: 'hover:text-[#0A66C2]'
                        },
                        {
                            icon: <FaFacebook />,
                            link: 'https://facebook.com/',
                            color: 'hover:text-[#1877F2]'
                        },
                        {
                            icon: <FaInstagram />,
                            link: 'https://instagram.com/',
                            color: 'hover:text-[#E4405F]'
                        },
                        {
                            icon: <FaEnvelope />,
                            link: 'mailto:mahmodelshikh77@gmail.com',
                            color: 'hover:text-[#EA4335]'
                        }
                    ].map((item, i) => (
                        <a
                            key={i}
                            href={item.link}
                            target="_blank"
                            onMouseMove={handleMagnetic}
                            onMouseLeave={resetMagnetic}
                            className={`social-icon text-gray-500 text-xl w-12 h-12 rounded-full border border-white/5 bg-white/5 flex items-center justify-center transition-colors duration-300 ${item.color} hover:bg-white/10`}
                        >
                            {item.icon}
                        </a>
                    ))}
                </div>

                {/* Button */}
                <a
                    ref={buttonRef}
                    href="/Mahmoud-ElSheikh-CV.pdf"
                    download
                    onMouseMove={handleMagnetic}
                    onMouseLeave={resetMagnetic}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <FaDownload />
                        DOWNLOAD CV
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
                <div className="w-px h-20 bg-linear-to-b from-white to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
