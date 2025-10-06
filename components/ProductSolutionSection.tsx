"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  MessageSquare,
  Layout,
  Calendar,
  Target,
  Handshake,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import EmailCaptureModal from "./EmailCaptureModal";
import { trackCustomEvent } from "@/lib/tracking";

export default function ProductSolutionSection() {
  const [showModal, setShowModal] = useState(false);

  const handleCTAClick = () => {
    trackCustomEvent.ctaClick("join_waitlist", "solution_section");
    setShowModal(true);
  };

  const features = [
    {
      id: "audience",
      icon: Users,
      title: "Audience & Market Analysis",
      shortTitle: "Audience Research",
      problem: "Stop guessing who your students are",
      benefit:
        "Get 3 detailed personas + ranked list of channels where your ideal students actually spend time. Powered by deep AI research.",
      details: [
        "3 detailed student personas with demographics, pain points, and motivations",
        "Ranked list of channels where your audience actually spends time",
        "Competitor analysis showing what works in your niche",
        "Deep AI-powered research using the latest data",
      ],
    },
    {
      id: "tone",
      icon: MessageSquare,
      title: "Tone of Voice",
      shortTitle: "Tone of Voice",
      problem: "Build trust with consistent messaging",
      benefit:
        "Choose from 3 professional ToV archetypes (Mentor/Coach/Analyst) with example hooks, CTAs, and vocabulary that resonates with your audience.",
      details: [
        "3 professionally crafted ToV archetypes (Mentor, Coach, Analyst)",
        "Example hooks and CTAs tailored to each voice",
        "Vocabulary guide with allowed and avoid words",
        "ToV converter to transform any post into your brand voice",
      ],
    },
    {
      id: "landing",
      icon: Layout,
      title: "Landing Page Builder",
      shortTitle: "Landing Page",
      problem: "Convert traffic into signups automatically",
      benefit:
        "Get a research-backed landing page template with copy tailored to your niche. We host it and provide analytics so you know what works.",
      details: [
        "Research-backed landing page structure optimized for conversions",
        "AI-generated copy tailored to your course niche",
        "Hosted on our platform at your custom URL",
        "Built-in analytics showing visits, CTR, and traffic sources",
      ],
    },
    {
      id: "content",
      icon: Calendar,
      title: "30-Day Content Engine",
      shortTitle: "Content Engine",
      problem: "Never stare at a blank page again",
      benefit:
        "Receive a ready-made 30-day posting plan with hooks, bullets, and CTAs for your chosen channels. Consistency made easy.",
      details: [
        "30-day content calendar with ready-to-post content",
        "Platform-specific formatting (TikTok, LinkedIn, YouTube, etc.)",
        "Pre-written hooks, bullets, and CTAs for each post",
        "Consistency made effortless—just show up and post",
      ],
    },
    {
      id: "ads",
      icon: Target,
      title: "Paid Ads Prep",
      shortTitle: "Paid Ads",
      problem: "Stop wasting money on blind testing",
      benefit:
        "Get AI-researched targeting groups, 3 ad copy variants, and campaign structure recommendations ready to import into Ads Manager.",
      details: [
        "AI-researched targeting groups (interests, demographics, lookalikes)",
        "3 ad copy variants (short, medium, long) tested for your niche",
        "Visual hook concepts and creative direction",
        "Campaign structure recommendations ready for Ads Manager",
      ],
    },
    {
      id: "affiliate",
      icon: Handshake,
      title: "Affiliate Finder",
      shortTitle: "Affiliates",
      problem: "Scale beyond your own reach",
      benefit:
        "Discover ideal affiliate partners (micro-creators, newsletters, communities) with outreach templates and offer recommendations.",
      details: [
        "Ideal affiliate partner profiles in your niche",
        "Suggested commission structures and cookie durations",
        "Ready-to-use outreach templates",
        "Mini asset kit to help affiliates promote effectively",
      ],
    },
    {
      id: "analytics",
      icon: BarChart3,
      title: "Analytics & Iteration",
      shortTitle: "Analytics",
      problem: "Know exactly what to fix next",
      benefit:
        'Auto "Do Next" recommendations based on your performance data. Transform analytics from numbers into a personal growth coach.',
      details: [
        'Automated "Do Next" recommendations based on your data',
        "Kill rules that identify what's not working",
        "Performance tracking across all channels",
        "Data-driven suggestions to optimize and grow faster",
      ],
    },
  ];

  return (
    <section id="features" className="bg-gray-50 py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
            Features That Fix the{" "}
            <span className="text-primary ">Real Problems</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature directly addresses a validated pain point course
            creators face
          </p>
        </div>

        {/* Tabbed Feature Interface */}
        <Tabs defaultValue="audience" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 gap-2 bg-transparent h-auto mb-2">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-white bg-white border border-gray-200 hover:border-primary transition-all px-4 py-3 rounded-lg flex  items-center gap-2"
              >
                <feature.icon className="h-5 w-5" />
                <span className="text-xs font-medium text-center">
                  {feature.shortTitle}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent
              key={feature.id}
              value={feature.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12 mt-0"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left: Feature Info */}
                <div>
                  <div className="bg-primary/10 rounded-lg p-4 w-fit mb-6">
                    <feature.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-heading mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-primary font-semibold text-lg mb-6">
                    {feature.problem}
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    {feature.benefit}
                  </p>
                  <Button
                    onClick={handleCTAClick}
                    className="bg-primary hover:bg-primary-hover text-white font-bold py-6 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Get Started
                  </Button>
                </div>

                {/* Right: Feature Details */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-200">
                  <h4 className="text-xl font-bold text-heading mb-6">
                    What You Get:
                  </h4>
                  <div className="space-y-4">
                    {feature.details.map((detail, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 leading-relaxed">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* How It Works - Simple Flow */}
        <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-200 mb-12">
          <h3 className="text-3xl font-bold lg:text-5xl  text-heading text-center mb-16">
            From Setup to Growth in 4 Simple Steps
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Tell Us About Your Course",
                desc: "Topic, format, language — takes 2 minutes",
              },
              {
                step: "2",
                title: "Get Your Strategy",
                desc: "Personas, channels, tone of voice, and content plan",
              },
              {
                step: "3",
                title: "Launch Your Page",
                desc: "We host your landing page with built-in analytics",
              },
              {
                step: "4",
                title: "Grow & Iterate",
                desc: 'Follow "Do Next" recommendations to optimize',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-100/50 text-teal-700 border border-teal-200 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-heading mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleCTAClick}
            className="bg-primary hover:bg-primary-hover text-white text-lg font-bold py-6 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Features That Actually Work — Join Waitlist
          </Button>
        </div>
      </div>

      <EmailCaptureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        source="product_solution"
      />
    </section>
  );
}
