'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Navbar() {
    const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
    const [show, setShow] = useState(true); // show navbar
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // scrolling down
                setShow(false);
            } else {
                // scrolling up
                setShow(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`
        fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl
        -translate-x-1/2 rounded-full
        bg-black/60 backdrop-blur-xl
        transition-all px-6 duration-500
        ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="mx-auto flex h-16 items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl antonio-font font-bold tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                >
                    MAHMOUD
                </Link>

                <div className="flex items-center gap-4">
                    {whatsapp && (
                        <a
                            href={`https://wa.me/${whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contact on WhatsApp"
                            className="rounded-xl p-2 transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                        >
                            <FaWhatsapp size={25} className="text-[#25D366]" />
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
}
