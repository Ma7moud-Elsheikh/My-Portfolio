'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const CursorGlow = () => {
    const glowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const glow = glowRef.current;
        if (!glow) return;

        gsap.set(glow, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3' });
        const yTo = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3' });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            xTo(clientX);
            yTo(clientY);

            gsap.to(glow, {
                scale: 1.2,
                duration: 0.2,
                overwrite: 'auto',
                onComplete: () => gsap.to(glow, { scale: 1, duration: 0.5 })
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <div className="cursor-glow" ref={glowRef} />
            <div className="cursor-dot" />
        </>
    );
};

export default CursorGlow;
