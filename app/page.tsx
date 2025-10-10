import { Metadata } from "next";
import Header from "@/components/Header";
import ProductHeroSection from "@/components/ProductHeroSection";
import ProductProblemSection from "@/components/ProductProblemSection";
import ProductSolutionSection from "@/components/ProductSolutionSection";
import ProductSocialProof from "@/components/ProductSocialProof";
import PricingSection from "@/components/PricingSection";
import AboutFounder from "@/components/AboutFounder";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white w-full">
      <Header />
      <ProductHeroSection />
      {/* <ProductProblemSection /> */}
      <ProductSolutionSection />
      <ProductSocialProof />
      <PricingSection />
      <FAQSection />
      <AboutFounder />
      <Footer />
    </div>
  );
}
