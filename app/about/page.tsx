import { MinimalistHero } from "@/components/animated/about-hero";
import { cal_dot_com_url, socials } from "@/lib/constants/metadata";

export default function Home() {
    return (
        <div className="flex flex-1 flex-col font-sans bg-white dark:bg-black">
            <main className="flex-1 isolate">
                <section id="hero-section" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 sm:px-0">
                    <MinimalistHero
                        mainText="Pixelite Studio is an idea of two creative minds in the world of photography who never settle for nothing less than extraordinary"
                        imageSrc="/assets/about/karthik-portrait.png"
                        imageAlt="A portrait of a person in a brown shirt, in profile."
                        overlayText={{
                            part1: 'I am',
                            part2: 'Karthik',
                        }}
                        contact={{
                            contactButtonText: "talk to me",
                            contactUrl: cal_dot_com_url
                        }}
                        socialLinks={socials['Karthik J']}
                        locationText="Bangalore, Karnataka, India"
                        imageBackgroundClassName="bg-green-600"
                    />
                </section>

            </main>

            <footer className="border-t border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-4 text-sm text-zinc-500 dark:text-zinc-500 sm:flex-row sm:justify-between sm:px-10">
                    <span>{new Date().getFullYear()} Pixelite Studios</span>
                </div>
            </footer>
        </div >
    );
}
