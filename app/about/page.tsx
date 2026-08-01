import { MinimalistHero } from "@/components/animated/about-hero";
import { aboutContacts } from "@/lib/constants/metadata";

export default function Home() {
    return (
        <div className="flex flex-1 flex-col font-sans">
            <main className="flex-1 isolate">
                <section id="hero-section" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 sm:px-0">
                    <MinimalistHero {...aboutContacts["Karthik J"]} />
                </section>

            </main>

            <footer className="border-t border-zinc-800">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-4 text-sm text-zinc-500 sm:flex-row sm:justify-between sm:px-10">
                    <span>{new Date().getFullYear()} Pixelite Studios</span>
                </div>
            </footer>
        </div >
    );
}
