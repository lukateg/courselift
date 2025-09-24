import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import ProblemSection from "@/components/ProblemSection";
import SolutionPreview from "@/components/SolutionPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import UrgencySection from "@/components/UrgencySection";
import FinalCTA from "@/components/FinalCTA";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white w-full">
      <Header />
      <HeroSection />
      <SocialProofBar />
      <ProblemSection />
      <SolutionPreview />
      <TestimonialsSection />
      <UrgencySection />
      <FinalCTA />
      <FAQSection />
      <Footer />
    </div>
  );
}
