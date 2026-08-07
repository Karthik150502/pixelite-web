// This is a file with a demo for your component
// That's what users will see in the preview
// Create new files in this directory to add more demos
"use client";

import { CoverflowCarousel } from "./carousel";


const R2 = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images";
const UNSPLASH = (id: string) =>
    `https://images.unsplash.com/photo-${id}?w=640&h=640&fit=crop&q=70&auto=format`;

const SLIDES = [
    {
        src: `${R2}/767d99bb371a54d0d36751e8cecae43c.jpg`,
        alt: "Diver silhouetted inside a sunset seascape shaped like a profile",
        title: "Tidewater",
        subtitle:
            "An underwater portrait session at golden hour, where the diver's silhouette dissolves into the colour of the evening tide.",
    },
    {
        src: `${R2}/821d815affa6496c39cbdeeec7a84603.jpg`,
        alt: "Double-exposure portrait blended with a city skyline at dusk",
        title: "Nightshift",
        subtitle:
            "A double-exposure portrait layered over the city skyline, shot on location for a client's dusk-till-dark brand story.",
    },
    {
        src: `${R2}/937438c560ada1c83317f2c11b3454b0.jpg`,
        alt: "Motion-blurred side-profile portrait against a deep orange backdrop",
        title: "Overexposed",
        subtitle:
            "A deliberately overexposed profile portrait, captured mid-motion against a deep amber studio backdrop for an editorial series.",
    },
    {
        src: `${R2}/98f89cb9994f5c382ab964062c4039db.jpg`,
        alt: "Figure holding a racket that dissolves into a swirling cloud at dusk",
        title: "Slow Bloom",
        subtitle:
            "A sports portrait reimagined for personal branding, the racket dissolving into a swirl of dusk light and long exposure.",
    },
    {
        src: `${R2}/ddcbee38be8b7274e19e132d7ab35b53.jpg`,
        alt: "Hand gesture with a cutout of a bird flying through the fingers",
        title: "Open Palm",
        subtitle:
            "A conceptual detail shot from an engagement shoot, with a bird cut loose between the fingers to mark a new beginning.",
    },
    {
        src: UNSPLASH("1470071459604-3b5ec3a7fe05"),
        alt: "Fog rolling through a forested valley at first light",
        title: "Low Country",
        subtitle:
            "Fog rolling through a forested valley at first light, from a pre-dawn scouting trip ahead of a forest wedding.",
    },
    {
        src: UNSPLASH("1500534314209-a25ddb2bd429"),
        alt: "Sunlit dune ridge under a hard blue sky",
        title: "Dry Season",
        subtitle:
            "A sunlit dune ridge under a hard blue sky, captured while scouting locations for an upcoming desert elopement.",
    },
    {
        src: UNSPLASH("1441974231531-c6227db76b6e"),
        alt: "Sunlight breaking through a dense stand of trees",
        title: "Understory",
        subtitle:
            "Sunlight breaking through a dense stand of trees — one quiet frame from a couple's forest engagement session.",
    },
    {
        src: UNSPLASH("1493246507139-91e8fad9978e"),
        alt: "Pastel abstract of coloured smoke against a pale ground",
        title: "Paper Lantern",
        subtitle:
            "Coloured smoke drifting against a pale backdrop, the opening frame from a birthday celebration shoot.",
    },
    {
        src: UNSPLASH("1501785888041-af3ef285b470"),
        alt: "Mountain lake mirroring a ridgeline at dusk",
        title: "Still Water",
        subtitle:
            "A mountain lake mirroring the ridgeline at dusk, from a weekend recce for a destination wedding in the hills.",
    },
    {
        src: UNSPLASH("1465101162946-4377e57745c3"),
        alt: "Long exposure of light trails over a dark landscape",
        title: "Third Rail",
        subtitle:
            "Long-exposure light trails over a quiet stretch of road, shot for a corporate client's brand campaign.",
    },
    {
        src: UNSPLASH("1519681393784-d120267933ba"),
        alt: "Snow-covered peak lit by a cold morning sun",
        title: "Undertow",
        subtitle:
            "A snow-covered peak catching the first cold light of morning, framed during a winter elopement in the mountains.",
    },
];

// ONLY DEFAULT EXPORT WILL BE TREATED AS A DEMO
export default function PorfolioCarousel() {
    return (
        <div className="w-full overflow-hidden py-6">
            <CoverflowCarousel slides={SLIDES} showCaption cardWidth="clamp(222px, 33vw, 390px)" />
        </div>
    );
}
