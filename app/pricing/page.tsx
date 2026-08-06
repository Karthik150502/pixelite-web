import Footer from "@/components/animated/footer";
import Pricing from "@/components/animated/pricing";
import { WebGLShader } from "@/components/animated/webgl-shader";

export default function Home() {
    return (
        <div className="flex flex-1 flex-col font-sans">
            <main className="flex-1 isolate flex flex-col items-center justify-center min-h-screen">
                <section className="relative flex w-full flex-col items-center justify-center">
                    <WebGLShader />
                    <Pricing />
                </section>
            </main>

            <Footer />
        </div>
    );
}
