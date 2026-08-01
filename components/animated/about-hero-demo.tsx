import { MinimalistHero } from './about-hero';
import { socials } from '@/lib/constants/metadata';

const MinimalistHeroDemo = () => {
    return (
        <MinimalistHero
            mainText="Hi, I am the person you are looking at right now. Pixelite Studio was an idea of two best friends who are fan extraordinary."
            readMoreLink="#"
            imageSrc="https://dl.dropboxusercontent.com/scl/fi/udqk30goqo2mun8oy05wr/IMG_4855.PNG?rlkey=xwk7bsk19f18z8n003ncay399&st=xwcu44az&dl=0"
            imageAlt="A portrait of a person in a brown shirt, in profile."
            overlayText={{
                part1: 'I am',
                part2: 'Karthik',
            }}
            socialLinks={socials['Karthik J']}
            locationText="Bangalore, Karnataka, India"
        />
    );
};

export default MinimalistHeroDemo;
