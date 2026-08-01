import { MinimalistHero } from './about-hero';
import { cal_dot_com_url, socials } from '@/lib/constants/metadata';

const MinimalistHeroDemo = () => {
    return (
        <MinimalistHero
            mainText="Pixelite Studio is an idea of two creative minds in the world of photography who never settle for nothing less than extraordinary"
            imageSrc="https://dl.dropboxusercontent.com/scl/fi/udqk30goqo2mun8oy05wr/IMG_4855.PNG?rlkey=xwk7bsk19f18z8n003ncay399&st=xwcu44az&dl=0"
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
        />
    );
};

export default MinimalistHeroDemo;
