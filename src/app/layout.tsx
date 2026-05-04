import type { Metadata } from 'next';
import { Antonio, Poppins, Satisfy } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

import CursorGlow from '@/components/cursor/CursorGlow';
import SmoothScroll from '@/components/cursor/SmoothScroll';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-poppins'
});

const antonio = Antonio({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-antonio'
});

const satisfy = Satisfy({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-satisfy'
});

export const metadata: Metadata = {
    title: 'Mahmoud Elsheikh | Portfolio',
    description: 'Personal website showcasing projects and skills of Mahmoud Elsheikh',
    verification: {
        google: 'M-QzbIZ50XUuwsYL19jYjw4LP-uhU95pKVdKUzMkUa4'
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${poppins.variable} ${antonio.variable} ${satisfy.variable} antialiased bg-[#0a0a0a] text-white`}
            >
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-X4WK99E9D4"
                    strategy="afterInteractive"
                />

                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-X4WK99E9D4');
                    `}
                </Script>

                <SmoothScroll />
                <CursorGlow />
                <main>{children}</main>
            </body>
        </html>
    );
}
