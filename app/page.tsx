import Link from "next/link";

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
    <div className="flex flex-1 flex-col bg-white font-sans dark:bg-black">
      <main className="flex-1">
        <section className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,--theme(--color-primary/.2),transparent_60%)]"
          />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 sm:px-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              The Pixelite Studios
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-6xl sm:leading-tight">
              Stories behind every frame we capture.
            </h1>
            <p className="max-w-xl text-md leading-8 text-zinc-600 dark:text-zinc-400">
              See through our eyes and discover a high you have never felt before. 
              Portraits, landscapes and Weddings. About us, the work we do and done, 
              and the moments that almost got away.
            </p>
          </div>
        </section>

        <section id="journal" className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Latest posts
            </h2>
            <Link
              href="#"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="group flex flex-col gap-4">
                <div
                  className={`aspect-[4/3] w-full rounded-2xl bg-gradient-to-br ${post.gradient} transition-transform duration-300 group-hover:scale-[1.02]`}
                />
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-primary">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold leading-snug text-zinc-950 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-zinc-500 dark:text-zinc-500 sm:flex-row sm:justify-between sm:px-10">
          <span>© {new Date().getFullYear()} Pixelite Studios</span>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-zinc-950 dark:hover:text-white">
              Instagram
            </Link>
            <Link href="#" className="hover:text-zinc-950 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
