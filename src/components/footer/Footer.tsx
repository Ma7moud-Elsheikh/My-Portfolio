'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;

    const footerRef = useRef<HTMLElement>(null);
    const copyrightRef = useRef<HTMLDivElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const backTopRef = useRef<HTMLButtonElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (
            !footerRef.current ||
            !copyrightRef.current ||
            !socialRef.current ||
            !backTopRef.current
        )
            return;

        const ctx = gsap.context(() => {
            // Animate footer items on scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 95%',
                    once: true
                }
            });

            tl.fromTo(
                dividerRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
            )
                .fromTo(
                    copyrightRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                    '-=0.4'
                )
                .fromTo(
                    socialRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                    '-=0.4'
                )
                .fromTo(
                    backTopRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                    '-=0.4'
                );

            // Animate social links individually with stagger
            const socialLinks = socialRef.current?.querySelectorAll('a');
            if (socialLinks) {
                gsap.fromTo(
                    socialLinks,
                    { opacity: 0, scale: 0.8, y: 10 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: 'top 95%',
                            once: true
                        }
                    }
                );
            }
        }, footerRef);

        return () => ctx.revert();
    }, []);

    // Hover animation for social links
    const handleSocialEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {
            y: -4,
            scale: 1.15,
            duration: 0.25,
            ease: 'power2.out'
        });
    };

    const handleSocialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: 'power2.in'
        });
    };

    // Hover animation for back to top button
    const handleBackTopEnter = () => {
        gsap.to(backTopRef.current, {
            y: -3,
            scale: 1.05,
            duration: 0.25,
            ease: 'power2.out'
        });
    };

    const handleBackTopLeave = () => {
        gsap.to(backTopRef.current, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: 'power2.in'
        });
    };

    return (
        <footer
            ref={footerRef}
            aria-label="Site footer"
            className="relative bg-[#0a0a0a] border-white/10 py-8 md:py-12 overflow-hidden"
        >
            {/* Background glow — decorative only */}
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/5 blur-[100px] rounded-full -z-10"
            />

            <div className="max-w-6xl mx-auto px-6">
                {/* Animated divider */}
                <div
                    ref={dividerRef}
                    aria-hidden="true"
                    className="w-full h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent mb-8 origin-left"
                />

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    {/* Copyright */}
                    <div ref={copyrightRef} className="text-gray-400 text-sm">
                        &copy; {currentYear}{' '}
                        <span className="text-white font-medium">Mahmoud Elsheikh</span>. All rights
                        reserved.
                    </div>

                    {/* Social links with icons */}
                    <nav
                        ref={socialRef}
                        aria-label="Social media links"
                        className="flex items-center gap-6"
                    >
                        <a
                            href="https://github.com/Ma7moud-Elsheikh"
                            aria-label="GitHub profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={handleSocialEnter}
                            onMouseLeave={handleSocialLeave}
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-1.5 text-sm"
                        >
                            <FaGithub className="w-4 h-4" aria-hidden="true" />
                            GitHub
                        </a>

                        <a
                            href="https://www.linkedin.com/"
                            aria-label="LinkedIn profile"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={handleSocialEnter}
                            onMouseLeave={handleSocialLeave}
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-1.5 text-sm"
                        >
                            <FaLinkedin className="w-4 h-4" aria-hidden="true" />
                            LinkedIn
                        </a>

                        <a
                            href={`https://wa.me/${whatsapp}`}
                            aria-label="Contact on WhatsApp"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={handleSocialEnter}
                            onMouseLeave={handleSocialLeave}
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-1.5 text-sm"
                        >
                            <FaWhatsapp className="w-4 h-4" aria-hidden="true" />
                            WhatsApp
                        </a>
                    </nav>

                    {/* Back to top button */}
                    <button
                        ref={backTopRef}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        onMouseEnter={handleBackTopEnter}
                        onMouseLeave={handleBackTopLeave}
                        aria-label="Back to top"
                        className="text-gray-400 cursor-pointer hover:text-blue-400 transition-colors duration-300 text-sm flex items-center gap-1.5 group"
                    >
                        Back to Top
                        <HiArrowUp
                            className="w-4 h-4"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
