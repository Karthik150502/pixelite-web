import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import FloatingDockDashboard from "@/components/floating-dock";
import Logo from "@/components/logo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixelite — Photography Journal",
  description: "Stories, sessions, and stills from the Pixelite photography venture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} h-full overflow-x-hidden antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Logo />
        <FloatingDockDashboard />
        {children}
      </body>
    </html>
  );
}
