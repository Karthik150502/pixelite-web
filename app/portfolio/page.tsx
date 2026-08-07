import CTAWithVerticalMarquee from "@/components/animated/call-of-action2";
import PorfolioCarousel from "@/components/animated/carousel-demo";
import Footer from "@/components/animated/footer";
import AuroraHeroDemo from "@/components/animated/hero-2-demo";
import { WebGLShader } from "@/components/animated/webgl-shader";

export default function Home() {
    return (
        <div className="flex flex-1 flex-col font-sans">
            <main className="flex-1 isolate">
                <section id="hero-section" className="relative flex w-full flex-col items-center justify-center overflow-hidden px-6 sm:px-0">
                    <WebGLShader />
                    <AuroraHeroDemo />
                </section>
                <section id="slideshow-section" className="relative flex h-auto w-full flex-col items-center justify-center py-8 sm:py-12">
                    <PorfolioCarousel/>
                </section>
                <section className="relative flex w-full flex-col items-center justify-center">
                    <CTAWithVerticalMarquee />
                </section>
            </main>

            <Footer />
        </div>
    );
}
