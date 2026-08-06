import { LetsWorkTogether } from "@/components/animated/call-for-action";
import DemoMarquee from "@/components/animated/demo-marquee";
import DemoTestimonials from "@/components/animated/demo-testimonials";
import Footer from "@/components/animated/footer";
import { ShuffleHero } from "@/components/animated/shuffle-image";
import { WebGLShader } from "@/components/animated/webgl-shader";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="flex-1 isolate">
        <section id="hero-section" className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 sm:px-0">
          <WebGLShader />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,--theme(--color-primary/.2),transparent_60%)]"
          />
          <div className="mx-auto flex w-fit max-w-6xl flex-col items-center gap-2 rounded-4xl border px-6 py-6 text-center  backdrop-blur-xl sm:px-10 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.2)]">
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl sm:leading-tight">
              Stories behind every frame we capture
            </h1>
            <p className="max-w-xl text-sm font-light leading-8 text-foreground">
              See through our eyes and discover a high you have never felt before.
              Portraits, landscapes and Weddings. About us, the work we do and done,
              and the moments that almost got away.
            </p>
          </div>
        </section>
        <section className="relative isolate flex w-full min-h-screen flex-col items-center justify-center">
          <ShuffleHero />
        </section>
        {/* <section className="relative isolate flex w-full h-auto flex-col items-center justify-center">
        </section> */}
        <DemoMarquee />
        <section className="relative isolate flex w-full flex-col items-center justify-center">
          <DemoTestimonials />
        </section>
        <section className="relative isolate flex w-full flex-col items-center justify-center">
          <LetsWorkTogether
            headTitle={"Available for Shoots"}
            title={"Let's collaborate"}
            title2={"together"}
            subTitle={"Have an idea in mind? we'd love to hear about it. Let&apos;s capture something exceptional together."}
          />
        </section>

      </main>

      <Footer />
    </div>
  );
}
