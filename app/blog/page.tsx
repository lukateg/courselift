import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog-data";
import { Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "CourseLift Blog - Course Marketing Tips & Strategies",
  description:
    "Learn proven strategies to market and grow your online course. Discover tips on finding students, building funnels, and promoting without ads.",
  openGraph: {
    title: "CourseLift Blog - Course Marketing Tips & Strategies",
    description:
      "Learn proven strategies to market and grow your online course.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-6">
            Course Marketing <span className="text-[#FF6B35]">Blog</span>
          </h1>
          <p className="text-xl text-gray-600">
            Proven strategies to find students, build funnels, and grow your
            online course — without ads.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts
              .filter((post) => post.published)
              .map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-[#FF6B35] transition-all duration-300 overflow-hidden hover:shadow-lg"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#FF6B35] transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {post.description}
                    </p>

                    <div className="text-[#FF6B35] font-semibold group-hover:underline">
                      Read more →
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
