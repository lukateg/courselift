import Link from "next/link";
import { BookOpen, Mail, Linkedin, Twitter, TrendingUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-heading text-white py-12 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              [<TrendingUp className="text-primary" />]
              <span className="text-xl font-semibold font-robotomono text-white">
                Course<span className="text-primary">Lift</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Turn your course into a brand with research-driven marketing,
              content, and analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-gray-300 text-sm hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="block text-gray-300 text-sm hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/lesson"
                className="block text-gray-300 text-sm hover:text-primary transition-colors"
              >
                Free Training
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4 text-white">Resources</h4>
            <div className="space-y-2">
              <Link
                href="/blog/how-to-find-students-for-your-online-course"
                className="block text-gray-300 text-sm hover:text-primary transition-colors"
              >
                Find Students Guide
              </Link>
              <Link
                href="/blog/the-complete-course-marketing-funnel-explained"
                className="block text-gray-300 text-sm hover:text-primary transition-colors"
              >
                Marketing Funnel
              </Link>
              <Link
                href="/blog/how-to-promote-an-online-course-without-ads"
                className="block text-gray-300 text-sm hover:text-primary transition-colors"
              >
                Promote Without Ads
              </Link>
              <Link
                href="/blog/email-sequence-for-course-launch"
                className="block text-gray-300 text-sm hover:text-primary transition-colors"
              >
                Email Sequence Templates
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 CourseLift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
