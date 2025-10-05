"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Target, Zap } from "lucide-react";
import EmailCaptureModal from "./EmailCaptureModal";
import { trackCustomEvent } from "@/lib/tracking";
import luka from "@/public/images/LukaAvatar.webp";
import Image from "next/image";

export default function AboutFounder() {
  const [showModal, setShowModal] = useState(false);

  const handleCTAClick = () => {
    trackCustomEvent.ctaClick("join_waitlist", "about_founder");
    setShowModal(true);
  };

  const mission = [
    {
      icon: Target,
      title: "Clear Focus",
      text: "Help course creators avoid wasting months on guesswork",
    },
    {
      icon: Zap,
      title: "Fast Results",
      text: "Give you the same marketing edge as big players",
    },
    {
      icon: Heart,
      title: "Fair Pricing",
      text: "Deliver value at a fraction of agency time and cost",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto ">
        <div>
          {/* Founder Story */}
          <div className="bg-gray-50 p-20 rounded-lg">
            {/* <div className="flex items-center justify-center"> */}
            <div className="flex items-center mx-auto justify-center overflow-hidden rounded-full mb-4 h-24 w-24">
              <Image
                src={luka}
                alt="Luka"
                className="rounded-full h-[150px] w-[150px] object-cover"
                width={128}
                height={128}
              />
            </div>
            <div>
              <h2 className="text-3xl text-center lg:text-3xl font-bold text-[#2C3E50] mb-10">
                Hi, it&apos;s{" "}
                <span className="text-[#FF6B35]">Luka from CourseLift</span>
              </h2>
            </div>
            {/* </div> */}
            <div className="space-y-10 text-gray-700 leading-relaxed text-lg max-w-2xl mx-auto">
              <p>
                I&apos;ve been building tools for creators and startups for
                years, and I&apos;ve seen the same pattern over and over:{" "}
                <span className="font-semibold">
                  great content, terrible marketing.
                </span>
              </p>
              <p>
                Course creators pour their hearts into their material, then
                struggle for months trying to reach the right audience. I know
                how hard it is to consistently attract students when you&apos;re
                competing with endless noise online.
              </p>
              <p>
                That&apos;s exactly why I created{" "}
                <span className="font-semibold text-[#FF6B35]">CourseLift</span>
                : to help you avoid wasting months on guesswork and finally get
                the growth you deserve.
              </p>
              <p className="text-xl font-semibold text-[#2C3E50]">
                My mission is simple: give you the same marketing edge as big
                players, but at a fraction of the time and cost.
              </p>
            </div>
          </div>

          {/* Mission Points */}
          {/* <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-200">
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-6 text-center">
                What Drives CourseLift
              </h3>
              <div className="space-y-6">
                {mission.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-[#FF6B35] rounded-lg p-3">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2C3E50] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <p className="text-gray-700 italic text-center">
                &quot;If you&apos;re tired of throwing spaghetti at the wall and
                hoping something sticks, I built CourseLift for you. Let&apos;s
                grow smarter, together.&quot;
              </p>
              <p className="text-[#FF6B35] font-bold text-center mt-4">
                — Luka, Founder
              </p>
            </div>
          </div>
        </div> */}
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white p-8 lg:p-12 rounded-2xl shadow-xl">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Be Part of CourseLift&apos;s Journey
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Join 800+ course creators who are growing smarter, not harder
          </p>
          <Button
            onClick={handleCTAClick}
            className="bg-white text-[#FF6B35] hover:bg-gray-100 text-lg font-bold py-6 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Join Today and Grow Smarter
          </Button>
        </div>
      </div>

      <EmailCaptureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        source="about_founder"
      />
    </section>
  );
}
