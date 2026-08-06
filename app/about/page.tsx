import { MinimalistHero } from "@/components/animated/about-hero";
import Footer from "@/components/animated/footer";
import { WebGLShader } from "@/components/animated/webgl-shader";
import { aboutContacts } from "@/lib/constants/metadata";

export default function Home() {
    return (
        <div className="flex flex-1 flex-col font-sans">
            <main className="flex-1 isolate">
                <section id="hero-section" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 sm:px-0">
                    <WebGLShader />
                    <MinimalistHero {...aboutContacts["Karthik J"]} />
                </section>

            </main>

            <Footer />
        </div >
    );
}
