import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Noto_Sans, Roboto_Mono } from "next/font/google";
import courseLiftFav from "./CourseLiftFav.png";
import MetaPixels from "@/components/MetaPixels";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-notosans",
  weight: "400",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-robotomono",
});

export const metadata: Metadata = {
  title: "CourseLift - Stop Guessing Where Your Students Are",
  description:
    "Discover why 87% of course creators fail at marketing and how AI fixes it in 10 minutes. Free training reveals the exact system to find your audience automatically.",
  icons: {
    icon: courseLiftFav.src,
    shortcut: courseLiftFav.src,
    apple: courseLiftFav.src,
  },
  openGraph: {
    title: "CourseLift - Stop Guessing Where Your Students Are",
    description:
      "Discover why 87% of course creators fail at marketing and how AI fixes it in 10 minutes.",
    images: [
      {
        url: courseLiftFav.src,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CourseLift - Stop Guessing Where Your Students Are",
    description:
      "Discover why 87% of course creators fail at marketing and how AI fixes it in 10 minutes.",
    images: [courseLiftFav.src],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${notoSans.variable} ${robotoMono.variable}`}
    >
      <body>
        <MetaPixels />
        {children}
      </body>
    </html>
  );
}
