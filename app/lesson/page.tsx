import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import ProblemSection from "@/components/ProblemSection";
import SolutionPreview from "@/components/SolutionPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

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
