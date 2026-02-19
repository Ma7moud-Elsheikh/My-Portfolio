import type { Metadata } from 'next';
import './globals.css';

// Google Fonts: Antonio, Poppins, Satisfy
const antonio = {
    importLink: 'https://fonts.googleapis.com/css2?family=Antonio:wght@400;700&display=swap'
};

const poppins = {
    importLink: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
};

const satisfy = {
    importLink: 'https://fonts.googleapis.com/css2?family=Satisfy&display=swap'
};

// Inject Google Fonts via <link>
const GoogleFontsLinks = () => (
    <>
        <link href={antonio.importLink} rel="stylesheet" />
        <link href={poppins.importLink} rel="stylesheet" />
        <link href={satisfy.importLink} rel="stylesheet" />
    </>
);

export const metadata: Metadata = {
    title: 'Mahmoud Elsheikh Portfolio',
    description:
        "Mahmoud Elsheikh Portfolio is a personal website showcasing the projects and skills of Mahmoud Elsheikh, a software developer. The portfolio includes information about Mahmoud's background, experience, and contact details."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <GoogleFontsLinks />
            </head>
            <body
                className="antialiased"
                style={
                    {
                        '--font-poppins': 'Poppins, sans-serif',
                        '--font-antonio': 'Antonio, sans-serif',
                        '--font-satisfy': 'Satisfy, cursive'
                    } as React.CSSProperties
                }
            >
                {children}
            </body>
        </html>
    );
}
