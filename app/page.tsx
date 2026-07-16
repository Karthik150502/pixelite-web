import Demo from "@/components/animated/demo";
import { WebGLShader } from "@/components/animated/webgl-shader";

const posts = [
  {
    slug: "golden-hour-in-the-dunes",
    category: "Landscape",
    title: "Golden Hour in the Dunes",
    excerpt:
      "Chasing the last light across shifting sand, and what forty minutes of waiting taught me about patience.",
    date: "Jun 12, 2026",
    readTime: "6 min read",
    gradient: "from-fuchsia-500 via-purple-700 to-[#3d0745]",
  },
  {
    slug: "shooting-weddings-in-the-rain",
    category: "Weddings",
    title: "Shooting Weddings in the Rain",
    excerpt:
      "Why the worst weather forecast of the season produced our favorite gallery yet.",
    date: "May 28, 2026",
    readTime: "8 min read",
    gradient: "from-[#3d0745] via-purple-950 to-black",
  },
  {
    slug: "a-portrait-lighting-primer",
    category: "Technique",
    title: "A Portrait Lighting Primer",
    excerpt:
      "Three light setups we return to again and again, broken down frame by frame.",
    date: "May 09, 2026",
    readTime: "5 min read",
    gradient: "from-rose-500 via-fuchsia-700 to-[#3d0745]",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans bg-white dark:bg-black">
      <main className="flex-1 isolate">



        <WebGLShader />

        <section className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,--theme(--color-primary/.2),transparent_60%)]"
          />
          <div className="mx-auto flex w-fit max-w-6xl flex-col items-center gap-2 rounded-4xl border border-white/30 px-6 py-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:px-10 dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.2)]">
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-6xl sm:leading-tight">
              Stories behind every frame we capture
            </h1>
            <p className="max-w-xl text-sm font-light leading-8 text-zinc-950 dark:text-white">
              See through our eyes and discover a high you have never felt before.
              Portraits, landscapes and Weddings. About us, the work we do and done,
              and the moments that almost got away.
            </p>
          </div>
        </section>
        <section className="relative isolate flex w-full flex-col items-center justify-center">
          <Demo />
        </section>

      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-4 text-sm text-zinc-500 dark:text-zinc-500 sm:flex-row sm:justify-between sm:px-10">
          <span>{new Date().getFullYear()} Pixelite Studios</span>
        </div>
      </footer>
    </div>
  );
}
