"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Zap,
  DollarSign,
  Users as UsersIcon,
} from "lucide-react";
import EmailCaptureModal from "./EmailCaptureModal";
import { trackCustomEvent } from "@/lib/tracking";

export default function PricingSection() {
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCTAClick = () => {
    trackCustomEvent.ctaClick("join_waitlist", "pricing_section");
    setShowModal(true);
  };

  const earlyBirdFeatures = [
    "Complete audience & market analysis",
    "Custom tone of voice archetypes",
    "Hosted landing page with analytics",
    "30-day content calendar",
    "Paid ads prep package",
    "Affiliate finder (coming soon)",
    "Priority support",
    "Lifetime updates",
  ];

  const comparison = [
    {
      option: "Marketing Agency",
      cost: "$2,000 - $5,000/month",
      time: "4-6 weeks setup",
      result: "Generic strategies",
    },
    {
      option: "DIY + Trial & Error",
      cost: "$500+ in wasted ad spend",
      time: "3-6 months learning",
      result: "Inconsistent results",
    },
    {
      option: "CourseLift (Early Bird)",
      cost: "$24/month (was $48)",
      time: "10 minutes setup",
      result: "Research-backed system",
      highlight: true,
    },
  ];

  return (
    <section
      id="pricing"
      className="bg-gradient-to-br from-gray-50 to-orange-50/30 py-20 px-4 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#2C3E50] mb-6">
            Early Bird Pricing — <span className="text-[#FF6B35]">50% Off</span>
          </h2>
          <p className="text-xl text-gray-600">
            Lock in your discount before we launch
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white p-8 rounded-2xl mb-12 shadow-xl">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-6 w-6" />
              <span className="text-2xl font-bold">Limited Time Offer</span>
            </div>
            <p className="text-white/90">Early bird discount expires in:</p>
          </div>

          <div className="flex items-center justify-center gap-4 text-center">
            <div className="bg-white text-[#FF6B35] rounded-lg p-4 min-w-[80px]">
              <div className="text-3xl font-bold">{timeLeft.days}</div>
              <div className="text-sm">Days</div>
            </div>
            <div className="text-2xl">:</div>
            <div className="bg-white text-[#FF6B35] rounded-lg p-4 min-w-[80px]">
              <div className="text-3xl font-bold">{timeLeft.hours}</div>
              <div className="text-sm">Hours</div>
            </div>
            <div className="text-2xl">:</div>
            <div className="bg-white text-[#FF6B35] rounded-lg p-4 min-w-[80px]">
              <div className="text-3xl font-bold">{timeLeft.minutes}</div>
              <div className="text-sm">Minutes</div>
            </div>
            <div className="text-2xl">:</div>
            <div className="bg-white text-[#FF6B35] rounded-lg p-4 min-w-[80px]">
              <div className="text-3xl font-bold">{timeLeft.seconds}</div>
              <div className="text-sm">Seconds</div>
            </div>
          </div>
        </div>

        {/* Main Pricing Card */}
        <div className="bg-white rounded-2xl shadow-xl border-4 border-[#FF6B35] p-8 lg:p-12 mb-12 relative overflow-hidden">
          {/* Best Value Badge */}
          <div className="absolute -right-12 top-8 bg-green-500 text-white px-16 py-2 transform rotate-45 font-bold text-sm shadow-lg">
            BEST VALUE
          </div>

          <div className="text-center mb-8">
            <div className="inline-block bg-[#FF6B35]/10 px-4 py-2 rounded-full mb-4">
              <span className="text-[#FF6B35] font-bold">
                🎉 Early Bird Special
              </span>
            </div>
            <h3 className="text-3xl font-bold text-[#2C3E50] mb-4">
              CourseLift Pro
            </h3>
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-5xl font-bold text-[#FF6B35]">$24</span>
              <div className="text-left">
                <div className="text-gray-500 line-through">$48</div>
                <div className="text-gray-600 text-sm">per month</div>
              </div>
            </div>
            <p className="text-gray-600">
              Save $288/year with early bird pricing
            </p>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {earlyBirdFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button
            onClick={handleCTAClick}
            className="w-full bg-[#FF6B35] hover:bg-[#e55a2b] text-white text-xl font-bold py-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Secure Your 50% Early Bird Spot
          </Button>

          {/* Trust Signals */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-[#FF6B35]" />
              <span>800+ already signed up</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#FF6B35]" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#2C3E50] text-center mb-8">
            Compare Your Options
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {comparison.map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 ${
                  item.highlight
                    ? "border-[#FF6B35] bg-orange-50/50"
                    : "border-gray-200"
                }`}
              >
                {item.highlight && (
                  <div className="bg-[#FF6B35] text-white text-center py-1 px-3 rounded-full text-sm font-bold mb-4 inline-block">
                    Recommended
                  </div>
                )}
                <h4 className="font-bold text-[#2C3E50] text-lg mb-4">
                  {item.option}
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">Cost</div>
                    <div className="font-semibold text-gray-700">
                      {item.cost}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Time to Start</div>
                    <div className="font-semibold text-gray-700">
                      {item.time}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Results</div>
                    <div className="font-semibold text-gray-700">
                      {item.result}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EmailCaptureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        source="pricing_section"
      />
    </section>
  );
}
