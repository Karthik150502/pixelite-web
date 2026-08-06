export const NavbarItems = [
  { id: 1, href: "/", label: "home" },
  { id: 2, href: "/portfolio", label: "portfolio" },
  { id: 3, href: "/pricing", label: "pricing" },
  { id: 4, href: "/about", label: "about" },
];

export const cal_dot_com_url = "https://cal.com/karthikj_150502/15min"


export const socials = {
  "Karthik J": [
    {
      name: "Instagram",
      icon: "/assets/socials/instagram.svg",
      href: "https://www.instagram.com/karthik.00155"
    }, {
      name: "Twitter/ X",
      icon: "/assets/socials/twitter.svg",
      href: "https://x.com/Karthik72050421"
    }, {
      name: "Linked In",
      icon: "/assets/socials/linkedin.svg",
      href: "https://www.linkedin.com/in/karthik150502/"
    }
  ]
}

export const aboutContacts = {
  "Karthik J": {
    mainText:
      "Pixelite Studio is an idea of two creative minds in the world of photography who never settle for nothing less than extraordinary",
    imageSrc: "/assets/about/karthik-portrait.png",
    imageAlt: "A portrait of a person in a brown shirt, in profile.",
    overlayText: {
      part1: "I am",
      part2: "Karthik",
    },
    contact: {
      contactButtonText: "talk to me",
      contactUrl: cal_dot_com_url,
    },
    socialLinks: socials["Karthik J"],
    locationText: "Bangalore, Karnataka, India",
    imageBackgroundClassName: "bg-green-600",
  }
}