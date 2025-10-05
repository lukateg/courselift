"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Users, CheckCircle } from "lucide-react";
import EmailCaptureModal from "./EmailCaptureModal";
import { trackCustomEvent } from "@/lib/tracking";
import Image from "next/image";
import teachableLogo from "@/public/images/teachable.svg";
import kajabiLogo from "@/public/images/kajabi.svg";
import thinkificLogo from "@/public/images/thinkfic.svg";
import udemyLogo from "@/public/images/udemy.svg";
import sasha from "@/public/images/sasa.jpg";
import len from "@/public/images/lena.jpg";
import mihailo from "@/public/images/mihailo.jpg";
import peter from "@/public/images/petar.jpg";
import dobrica from "@/public/images/dobrica.jpg";
import miha from "@/public/images/miha.jpg";

export default function ProductSocialProof() {
  const [showModal, setShowModal] = useState(false);

  const handleCTAClick = () => {
    trackCustomEvent.ctaClick("join_waitlist", "social_proof");
    setShowModal(true);
  };

  const testimonials = [
    {
      name: "Sasha T.",
      role: "Fit After 50: Strength Training",
      quote: (
        <>
          {"Free course is great, but "}
          <span className="bg-yellow-200 text-[#2C3E50] px-1 rounded">
            {"I'm in for the analytics tool."}
          </span>
          {
            " I've spent an enormous amount of time trying to find out the number of people who are checking out my course but not buying it,"
          }
          <span className="bg-yellow-200 text-[#2C3E50] px-1 rounded">
            {"this is what I was waiting for!"}
          </span>
        </>
      ),
      avatar: sasha,
    },
    {
      name: "Lena N.",
      role: "The Science of Aging",
      quote: (
        <>
          {
            " I've passed these tips to the ChatGPT, and it found marketing angles I never thought of. "
          }
          <span className="bg-yellow-200 text-[#2C3E50] px-1 rounded">
            {
              "I'm on 10 sales milestone from yesterday, and I couldn't be happier!!!"
            }
          </span>
          {" Can't wait to automate this whole process with CourseLift"}
        </>
      ),
      avatar: len,
    },
    {
      name: "Mihailo I.",
      role: "Chefs CookBook",
      quote: (
        <>
          {
            "I don't know about you guys, but at this point, I trust this team with my house. I wrote down each step, and I now have actionable tasks to do every day, and the funniest thing is,"
          }
          <span className="bg-yellow-200 text-[#2C3E50] px-1 rounded">
            {
              "I've established communication with my audience on day 3. Bright days are coming!"
            }
          </span>
        </>
      ),
      avatar: mihailo,
    },
    {
      name: "Peter R.",
      role: "Small Spaces - Modern Homes",
      quote: (
        <>
          {
            "Honestly, I feel relieved now. All I ever wanted was just to earn money from sharing the knowledge I have, and the marketing is not my cup of tea."
          }
          <span className="bg-yellow-200 text-[#2C3E50] px-1 rounded">
            {"For anyone reading this, keep going!!!"}
          </span>
        </>
      ),
      avatar: peter,
    },
    {
      name: "Dobrica C.",
      role: "Marketing Secrets",
      quote: (
        <>
          {
            "It's funny, I came here just to see if this guy knows what he is talking about, but I'm a bit surprised. After this,"
          }
          <span className="bg-yellow-200 text-[#2C3E50] px-1 rounded">
            {"can't wait to see the app launch."}
          </span>
        </>
      ),
      avatar: dobrica,
    },
    {
      name: "Michael I.",
      role: "All in one - QA testing",
      quote: (
        <>
          {"I’ve tried many marketing approaches but none were as "}
          <span className="bg-yellow-200 text-[#2C3E50] px-1 rounded">
            {"structured and easy to implement "}
          </span>{" "}
          {"as the 7-1-5 Method. The analytics and iterating tips helped me "}
          {"optimize fast and keep growing my revenue with less stress."}
        </>
      ),
      avatar: miha,
    },
  ];

  const betaTestimonials = [
    {
      quote:
        "I finally understand who my students are and where to find them. The persona research alone was worth it.",
      author: "Sasha T.",
      role: "Fitness Course Creator",
      result: "2x enrollments in first month",
    },
    {
      quote:
        "The landing page builder saved me weeks of work. It's optimized, hosted, and I can see exactly what's working.",
      author: "Lena N.",
      role: "Business Coach",
      result: "4.2% conversion rate",
    },
    {
      quote:
        "Having a 30-day content plan ready to go removed all my posting anxiety. I just show up and post.",
      author: "Mihailo I.",
      role: "Language Teacher",
      result: "Consistent 10k+ reach/month",
    },
  ];

  return (
    <section id="testimonials" className="bg-white py-20 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#2C3E50] mb-6">
            Join the Growing Community of{" "}
            <span className="text-[#FF6B35]">Course Creators</span>
          </h2>
          <p className="text-xl text-gray-600">
            Real results from early access users
          </p>
        </div>

        {/* Waitlist Counter */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl mb-12 border border-orange-200">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <Users className="h-12 w-12 text-[#FF6B35]" />
              <div className="text-5xl lg:text-6xl font-bold text-[#2C3E50]">
                800+
              </div>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xl lg:text-2xl text-gray-700 font-semibold">
                Course creators already on the waitlist
              </p>
              <p className="text-gray-600 mt-1">
                Be part of the launch — secure your early bird discount
              </p>
            </div>
          </div>
        </div>

        {/* Beta Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-lg flex justify-between flex-col"
            >
              <div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <blockquote className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
              </div>

              <div className="flex items-center">
                <div className="bg-[#FF6B35] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-4">
                  <Image
                    className="rounded-full"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div className="font-bold text-[#2C3E50]">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleCTAClick}
            className="bg-[#FF6B35] hover:bg-[#e55a2b] text-white text-lg font-bold py-6 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Join the Growing Community
          </Button>
        </div>
      </div>

      <EmailCaptureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        source="product_social_proof"
      />
    </section>
  );
}
