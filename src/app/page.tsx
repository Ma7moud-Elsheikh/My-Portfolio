import About from '@/components/about/About';
import Hero from '@/components/hero/Hero';
import Navbar from '@/components/navbar/Navbar';
import Skills from '@/components/skills/Skills';

const Page = () => {
    return (
        <main className="relative min-h-screen">
            <Navbar />
            <div className="pt-20">
                <Hero />
                <About />
                <Skills />
            </div>
        </main>
    );
};

export default Page;
