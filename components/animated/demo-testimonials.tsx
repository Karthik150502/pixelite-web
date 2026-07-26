"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "./testimonials";

const testimonials = [
    {
        text: "Pixelite Studios captured our special day beautifully. Every photo felt natural, emotional, and timeless. We couldn't have asked for a better photography team.",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Briana Patton",
        role: "Bride",
    },
    {
        text: "From the first consultation to the final gallery, the experience was seamless. The team made everyone feel comfortable, and the results exceeded our expectations.",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "Bilal Ahmed",
        role: "Groom",
    },
    {
        text: "Our family portraits turned out absolutely stunning. Pixelite Studios has an incredible eye for detail and captured genuine moments we'll treasure forever.",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        name: "Saman Malik",
        role: "Family Client",
    },
    {
        text: "We hired Pixelite Studios for our corporate event, and they delivered exceptional photos that perfectly reflected our brand. Professional, punctual, and highly skilled.",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Omar Raza",
        role: "Business Owner",
    },
    {
        text: "The maternity photoshoot was such a wonderful experience. They created a relaxed atmosphere and captured memories we'll cherish for a lifetime.",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        name: "Zainab Hussain",
        role: "Maternity Client",
    },
    {
        text: "I booked a personal branding session with Pixelite Studios, and the photos gave my portfolio a completely new level of professionalism. Highly recommended!",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        name: "Aliza Khan",
        role: "Entrepreneur",
    },
    {
        text: "The attention to lighting, composition, and editing was outstanding. Every image looked magazine-worthy while still feeling authentic.",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "Farhan Siddiqui",
        role: "Creative Director",
    },
    {
        text: "Our engagement shoot was fun, relaxed, and beautifully organized. The team made us feel confident, and the photos turned out better than we imagined.",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Sana Sheikh",
        role: "Engagement Client",
    },
    {
        text: "Pixelite Studios consistently delivers high-quality photography with excellent customer service. Their creativity and professionalism make them our go-to photography studio.",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        name: "Hassan Ali",
        role: "Repeat Client",
    },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


const Testimonials = () => {
    return (
        <section className="bg-background my-20 relative">

            <div className="container z-10 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-135 mx-auto"
                >

                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
                        What people say about us
                    </h2>
                    <p className="text-center mt-5 opacity-75">
                        See what our clients have to say about us.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-6 mt-10 mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-185 overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;    