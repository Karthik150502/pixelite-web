import CTAWithVerticalMarquee from "@/components/animated/call-of-action2";
import AuroraHeroDemo from "@/components/animated/hero-2-demo";
import Slideshow from "@/components/animated/slideshow";

export default function Home() {
    return (
        <div className="flex flex-1 flex-col font-sans">
            <main className="flex-1 isolate">
                <section id="hero-section" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 sm:px-0">
                    <AuroraHeroDemo />
                </section>
                <section id="slideshow-section" className="relative flex h-screen w-full flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-12 md:px-12">
                    <Slideshow />
                </section>
                <section className="relative flex w-full flex-col items-center justify-center">
                    <CTAWithVerticalMarquee />
                </section>
            </main>

            <footer className="border-t border-zinc-800">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-4 text-sm text-zinc-500 sm:flex-row sm:justify-between sm:px-10">
                    <span>{new Date().getFullYear()} Pixelite Studios</span>
                </div>
            </footer>
        </div>
    );
}
