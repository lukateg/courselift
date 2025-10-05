"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, TrendingUp } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white py-4 px-4 lg:px-8 border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            [<TrendingUp className="text-[#FF6B35]" />]
            <span className="text-xl font-semibold font-robotomono text-[#2C3E50]">
              Course<span className="text-[#FF6B35]">Lift</span>
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            {isHomePage ? (
              <>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-600 hover:text-[#FF6B35] font-medium transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-gray-600 hover:text-[#FF6B35] font-medium transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-gray-600 hover:text-[#FF6B35] font-medium transition-colors"
                >
                  FAQ
                </button>
              </>
            ) : (
              <Link
                href="/"
                className="text-gray-600 hover:text-[#FF6B35] font-medium transition-colors"
              >
                Home
              </Link>
            )}
            <Link
              href="/blog"
              className="text-gray-600 hover:text-[#FF6B35] font-medium transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
