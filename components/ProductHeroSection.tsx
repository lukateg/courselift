"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, TrendingUp } from "lucide-react";
import EmailCaptureModal from "./EmailCaptureModal";
import { trackCustomEvent } from "@/lib/tracking";
import Image from "next/image";
import dobrica from "@/public/images/dobrica.jpg";
import lena from "@/public/images/lena.jpg";
import miha from "@/public/images/miha.jpg";
import mihailo from "@/public/images/mihailo.jpg";
import veljko from "@/public/images/veljko.jpg";
import sasha from "@/public/images/sasa.jpg";
import petar from "@/public/images/petar.jpg";
import teachableLogo from "@/public/images/teachable.svg";
import kajabiLogo from "@/public/images/kajabi.svg";
import thinkificLogo from "@/public/images/thinkfic.svg";
import udemyLogo from "@/public/images/udemy.svg";

export default function ProductHeroSection() {
  const [showModal, setShowModal] = useState(false);

  const handleCTAClick = () => {
    trackCustomEvent.ctaClick("join_waitlist", "hero");
    setShowModal(true);
  };

  const badges = [
    { icon: Sparkles, text: "AI-Powered" },
    { icon: TrendingUp, text: "Trusted by Educators" },
    { icon: CheckCircle, text: "Research-Backed" },
  ];

  const avatars = [
    { src: dobrica, alt: "Dobrica - Course Creator" },
    { src: lena, alt: "Lena - Course Creator" },
    { src: mihailo, alt: "Mihailo - Course Creator" },
    { src: petar, alt: "Petar - Course Creator" },
    { src: veljko, alt: "Veljko - Course Creator" },
    { src: sasha, alt: "Sasha - Course Creator" },
    { src: miha, alt: "Miha - Course Creator" },
  ];

  return (
    <section className="bg-gradient-to-br from-white via-orange-50/30 to-white py-10 px-4 lg:px-8 ">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#d7dadf_1px,transparent_1px),linear-gradient(to_bottom,#d7dadf_1px,transparent_1px)] bg-[size:40px_40px] opacity-90 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>
      {/* Social Proof - Avatar Stack */}

      <div className=" mx-auto text-center relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-10 z-10 bg-gradient-to-r from-teal-50 to-cyan-50 py-4 px-8 rounded-full w-fit mx-auto border border-teal-100">
          <div className="flex -space-x-3">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden"
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-teal-700 font-semibold text-lg">
            Trusted by 800+ Course Creators
          </span>
        </div>
        {/* Headline with Dream Outcome */}
        <h1 className="text-4xl lg:text-6xl  text-[#2C3E50] mb-10 max-w-5xl mx-auto leading-tight">
          <span className="font-bold relative">
            Grow
            <div className="inline-block absolute bottom-0 left-0 h-2 w-full bg-sky-500 transform -rotate-3"></div>
          </span>{" "}
          Your Audience,{" "}
          <span className=" font-bold relative">
            Sell
            <div className="inline-block absolute bottom-0 left-0 h-2 w-full bg-sky-500 transform -rotate-3"></div>
          </span>{" "}
          Your Course
        </h1>

        {/* Subheadline with Time & Effort Claims */}
        <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          Transform your course idea into a complete marketing system in{" "}
          <span className="font-bold text-[#FF6B35]">10 minutes</span> instead
          of months of guesswork. Just describe your course — AI handles the
          rest.
        </p>

        {/* Credibility Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
            >
              <badge.icon className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
        {/* 
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-10 z-10 bg-gradient-to-r from-teal-50 to-cyan-50 py-4 px-8 rounded-full w-fit mx-auto border border-teal-100">
          <div className="flex -space-x-3">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden"
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-teal-700 font-semibold text-lg">
            Trusted by 800+ Course Creators
          </span>
        </div> */}

        {/* Primary CTA */}
        <div className="mb-8">
          <Button
            onClick={handleCTAClick}
            className="bg-[#FF6B35] hover:bg-[#e55a2b] text-white text-xl py-8 px-12 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Join the Waitlist Now (50% Early Bird Discount)
          </Button>
        </div>

        {/* Platform Logos */}
        <div className="flex items-center justify-center mt-12 bg-gray-50 p-8 rounded-lg border border-gray-200 w-full">
          <p className="text-center text-xl text-gray-600 font-medium">
            As seen in:
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-24 max-w-4xl mx-auto">
            <div className="bg-gray-50 px-6 py-4 rounded-lg border border-gray-200 flex justify-center items-center">
              <Image
                src={teachableLogo}
                alt="Teachable"
                width={100}
                height={40}
              />
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-lg border border-gray-200 flex justify-center items-center">
              <Image src={kajabiLogo} alt="Kajabi" width={100} height={40} />
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-lg border border-gray-200 flex justify-center items-center">
              <Image
                src={thinkificLogo}
                alt="Thinkific"
                width={100}
                height={40}
              />
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-lg border border-gray-200 flex justify-center items-center">
              <Image src={udemyLogo} alt="Udemy" width={100} height={40} />
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        {/* <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-[#FF6B35] font-bold text-3xl mb-2">10 min</div>
            <div className="text-gray-700">
              From course idea to marketing plan
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-[#FF6B35] font-bold text-3xl mb-2">3x</div>
            <div className="text-gray-700">
              Higher conversion top 1% course creators use
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-[#FF6B35] font-bold text-3xl mb-2">$0</div>
            <div className="text-gray-700">
              Upfront cost - only pay when you see results
            </div>
          </div>
        </div> */}
      </div>

      <EmailCaptureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        source="product_hero"
      />
    </section>
  );
}
