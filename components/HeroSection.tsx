"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Play, Users } from "lucide-react";
import EmailCaptureModal from "./EmailCaptureModal";
import { trackCustomEvent } from "@/lib/tracking";

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  const handleVideoClick = () => {
    trackCustomEvent.videoPlay("course_training_preview", "hero");
    // Here you would open your actual video player
    // For now, this is just a placeholder that tracks the click
  };

  return (
    <section className="bg-white py-12 px-4 lg:px-8">
      <div className="mx-auto text-center mb-6">
        <span className="font-black text-xl lg:text-3xl bg-sky-400 text-white px-2 py-1 rounded">
          FREE TRAINING
        </span>
      </div>
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-3xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
          Become a Top 1% Course Creator
        </h1>

        {/* Subheadline */}
        <p className="text-lg lg:text-2xl text-gray-600 lg:mb-16 mb-4 mx-auto leading-relaxed">
          Top 1% Course Creators know how to unlock{" "}
          <span className="font-bold">strategic thinking</span>,
          <span className="font-bold">creativity</span> and{" "}
          <span className="font-bold">growth</span> in order to keep selling
          courses again and again. This training will show you how I do it.
        </p>

        {/* Video Player */}
        <div className="flex lg:p-16 flex-col lg:flex-row gap-8 bg-gray-50 rounded-lg">
          <div className="relative w-full lg:w-2/3 max-w-[800px] mx-auto mb-8">
            <div
              className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg shadow-2xl overflow-hidden group cursor-pointer"
              onClick={handleVideoClick}
            >
              <div
                className=" hidden lg:block absolute -top-4 -left-10  text-white px-2 py-1 rounded text-sm"
                style={{ transform: "rotate(-10deg)" }}
              >
                <div className=" font-black text-3xl bg-sky-400 text-white px-2 py-1 rounded ">
                  {/* <div className="font-black text-3xl bg-[#FF6B35] text-white px-2 py-1 rounded mb-2"> */}
                  FREE BONUS
                </div>
                <div className="flex items-center gap-2 bg-accent text-md text-secondary-foreground border border-secondary rounded-md p-2">
                  Join the waitlist and get 50% off the launch price
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-4 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-10 w-10 text-white ml-1" fill="white" />
                  </div>
                  <div className="text-white text-lg font-semibold">
                    Free Training: 10 Minutes
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                10:30
              </div>
              {/* Fake thumbnail overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="w-full lg:w-1/3 gap-12 flex lg:flex-col flex-col-reverse ">
            <div className="text-left px-4">
              <h3 className="text-xl text-center lg:text-left font-bold text-[#2C3E50] mb-4">
                What You&apos;ll Learn
              </h3>
              <div className="lg:text-lg text-base lg:text-gray-600 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span>How to identify your exact audience effortlessly</span>
                </div>
                <div className="mb-2 flex items-start gap-4">
                  <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span>Strategies to automate your content creation</span>
                </div>
                <div className="mb-2 flex items-start gap-4">
                  <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span>Techniques to fill your courses automatically</span>
                </div>
              </div>
            </div>
            <div>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-foreground text-white text-lg font-bold py-6 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
              >
                Join Early Access Waitlist
              </Button>

              {/* Secondary text */}
              <div className="flex items-center justify-center text-gray-500 text-sm">
                <Users className="h-4 w-4 mr-2" />
                No payment required - Join 800+ creators
              </div>

              <div className="w-full lg:hidden mt-8 bg-sky-200/40 text-foreground border border-sky-200 rounded-md p-4">
                <span className="font-black">FREE BONUS:</span> Join the
                waitlist and get 50% off the launch price
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailCaptureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        source="hero_cta"
      />
    </section>
  );
}
