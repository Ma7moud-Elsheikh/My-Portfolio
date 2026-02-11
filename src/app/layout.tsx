import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/themes/theme-provider"
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
