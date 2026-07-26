import { Marquee } from "./marquee"

const Texts = [
    "Portraits",
    "Candid",
    "Wedding",
    "Birthdays",
    "Professional",
    "Corporate Events",
    "Traditional",
    "Intimate"
]

export default function DemoMarquee() {
    return (
        <div className="flex items-center justify-center w-full">
            <Marquee>
                {
                    Texts.map((text, id) => {
                        return <span key={id} className="mx-8 text-xl font-medium">{text}</span>
                    })
                }
            </Marquee>
        </div>
    )
}
