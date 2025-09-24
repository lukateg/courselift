"use client";

import { useState, useEffect } from "react";
import { Clock, Gift } from "lucide-react";

export default function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
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

  const benefits = [
    "50% off launch pricing (save $288/year)",
    "Free course idea validation tool ($97 value)",
    "Complete marketing playbook in 7 steps",
    "First access when we launch in October",
  ];

  return (
    <section className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white py-20 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Early Access Ends Soon
        </h2>

        <p className="text-xl mb-8 opacity-90">
          This exclusive early access training is only available for a limited
          time. Over 800 course creators have already joined the waitlist to get
          first access to our AI system.
        </p>

        {/* Countdown Timer */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 mr-2" />
            <span className="text-lg font-medium">Offer expires in:</span>
          </div>

          <div className="flex items-center justify-center space-x-4 text-center">
            <div className="bg-white text-[#FF6B35] rounded-lg p-4 min-w-[80px]">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-sm">Days</div>
            </div>
            <div className="text-2xl">:</div>
            <div className="bg-white text-[#FF6B35] rounded-lg p-4 min-w-[80px]">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div className="text-sm">Hours</div>
            </div>
            <div className="text-2xl">:</div>
            <div className="bg-white text-[#FF6B35] rounded-lg p-4 min-w-[80px]">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div className="text-sm">Minutes</div>
            </div>
            <div className="text-2xl">:</div>
            <div className="bg-white text-[#FF6B35] rounded-lg p-4 min-w-[80px]">
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
              <div className="text-sm">Seconds</div>
            </div>
          </div>
        </div>

        {/* Benefits Reminder */}
        <div className="grid md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <Gift className="h-5 w-5 flex-shrink-0" />
              <span className="text-left">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
