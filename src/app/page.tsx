import Hero from '@/components/hero/Hero';
import Navbar from '@/components/navbar/Navbar';

const Page = () => {
    return (
        <main className="relative min-h-screen">
            <Navbar />
            <div className="pt-20">
                <Hero />
            </div>
        </main>
    );
};

export default Page;
