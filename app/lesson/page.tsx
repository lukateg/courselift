import { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import ProblemSection from "@/components/ProblemSection";
import SolutionPreview from "@/components/SolutionPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Lesson - Find Your Course Students | CourseLift",
  description:
    "Watch our free training to discover how to find and attract students for your online course using proven marketing strategies.",
  alternates: {
    canonical: "/lesson",
  },
};

export default function LessonPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <Header />
      <HeroSection />
      <SocialProofBar />
      <ProblemSection />
      <SolutionPreview />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
