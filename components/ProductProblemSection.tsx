"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingDown } from "lucide-react";
import EmailCaptureModal from "./EmailCaptureModal";
import { trackCustomEvent } from "@/lib/tracking";

export default function ProductProblemSection() {
  const [showModal, setShowModal] = useState(false);

  const handleCTAClick = () => {
    trackCustomEvent.ctaClick("join_waitlist", "problem_section");
    setShowModal(true);
  };

  const problems = [
    "Wasted ad spend targeting the wrong audience",
    "Posting content without real engagement",
    "No consistent course enrollments",
    "Months spent guessing which marketing tactics work",
    "Can't identify where your ideal students actually spend time",
    "Marketing feels like throwing darts in the dark",
  ];

  return (
    <section className="bg-white py-20 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl text-heading mb-6">
            The Marketing Struggle Is Real
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You&apos;ve got an amazing course, but finding the right students
            feels impossible
          </p>
        </div>

        {/* Research Insight - Key Stat */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 lg:p-12 rounded-2xl mb-12 border border-red-100">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-500 rounded-full p-4">
                <TrendingDown className="h-10 w-10 text-white" />
              </div>
              <div className="text-6xl lg:text-7xl text-primary">75%</div>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xl lg:text-2xl text-gray-700 font-medium">
                of course creators struggle with{" "}
                <span className="font-bold text-heading">
                  audience targeting
                </span>
                , not content quality
              </p>
              <p className="text-gray-600 mt-2 italic">
                — Entrepreneur Magazine
              </p>
            </div>
          </div>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-gray-700 font-medium">{problem}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleCTAClick}
            className="bg-primary hover:bg-primary-hover text-white text-lg font-bold py-6 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Solve Audience Targeting Today — Join Early Access
          </Button>
        </div>
      </div>

      <EmailCaptureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        source="product_problem"
      />
    </section>
  );
}
