import About from '@/components/about/About';
import Hero from '@/components/hero/Hero';
import Navbar from '@/components/navbar/Navbar';
import Projects from '@/components/projects/Projects';
import Skills from '@/components/skills/Skills';

const Page = () => {
    return (
        <main className="relative min-h-screen">
            <Navbar />
            <div className="pt-28">
                <Hero />
                <About />
                <Skills />
                <Projects />
            </div>
        </main>
    );
};

export default Page;
