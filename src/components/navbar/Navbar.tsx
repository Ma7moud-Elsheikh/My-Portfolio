'use client';

import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const whatsappRef = useRef<HTMLAnchorElement>(null);

    const lastScrollY = useRef(0);
    const showNav = useRef(true);

    const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                if (showNav.current) {
                    gsap.to(navRef.current, {
                        y: -120,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power3.out'
                    });
                    showNav.current = false;
                }
            } else {
                if (!showNav.current) {
                    gsap.to(navRef.current, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out'
                    });
                    showNav.current = true;
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 }
            );

            gsap.from([logoRef.current, whatsappRef.current], {
                opacity: 0,
                x: -20,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 1
            });
        });

        return () => ctx.revert();
    }, []);

    const handleMagnetic = (e: React.MouseEvent<HTMLElement>) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        const x = (clientX - (left + width / 2)) * 0.3;
        const y = (clientY - (top + height / 2)) * 0.3;

        gsap.to(currentTarget, {
            x,
            y,
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    const resetMagnetic = (e: React.MouseEvent<HTMLElement>) => {
        gsap.to(e.currentTarget, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
        });
    };

    return (
        <nav
            ref={navRef}
            className="fixed top-6 left-1/2 z-50 w-[90%] max-w-5xl -translate-x-1/2 rounded-4xl bg-black/20 backdrop-blur-md border border-white/10 px-8"
        >
            <div className="mx-auto flex h-16 items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    ref={logoRef}
                    onMouseMove={handleMagnetic}
                    onMouseLeave={resetMagnetic}
                    className="group relative text-xl antonio-font font-black tracking-tighter text-white"
                >
                    <span>MAHMOUD</span>
                    <span className="absolute -right-2 bottom-1.5 w-1 h-1 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Link>

                {/* WhatsApp */}
                {whatsapp && (
                    <a
                        ref={whatsappRef}
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        onMouseMove={handleMagnetic}
                        onMouseLeave={resetMagnetic}
                        className="flex items-center justify-center text-[#25D366]"
                    >
                        <FaWhatsapp size={25} />
                    </a>
                )}
            </div>
        </nav>
    );
}
