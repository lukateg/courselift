import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { blogPosts, BlogPost } from "@/lib/blog-data";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailCaptureModal from "@/components/EmailCaptureModal";

export async function generateStaticParams() {
  return blogPosts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug && p.published);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | CourseLift Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function BlogContent({ post }: { post: BlogPost }) {
  // Convert markdown-style content to React elements
  const renderContent = (content: string) => {
    const sections = content.split("\n\n").filter((section) => section.trim());

    return sections.map((section, index) => {
      // H1
      if (section.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-3xl lg:text-4xl font-bold text-heading mb-6"
          >
            {section.replace("# ", "")}
          </h1>
        );
      }

      // H2
      if (section.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl lg:text-3xl font-bold text-heading mb-4 mt-12"
          >
            {section.replace("## ", "")}
          </h2>
        );
      }

      // H3
      if (section.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold text-heading mb-3 mt-8">
            {section.replace("### ", "")}
          </h3>
        );
      }

      // Horizontal rule
      if (section.startsWith("---")) {
        return <hr key={index} className="my-12 border-gray-200" />;
      }

      // Blockquote
      if (section.startsWith(">")) {
        const quoteText = section
          .split("\n")
          .map((line) => line.replace(/^>\s*/, ""))
          .join(" ");
        return (
          <blockquote
            key={index}
            className="border-l-4 border-primary pl-6 py-2 my-6 italic text-gray-700 bg-orange-50 rounded-r"
          >
            {quoteText}
          </blockquote>
        );
      }

      // Lists
      if (section.includes("\n- ")) {
        const items = section
          .split("\n")
          .filter((line) => line.startsWith("- "));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-6">
            {items.map((item, i) => (
              <li key={i} className="text-gray-700 leading-relaxed">
                {item.replace("- ", "")}
              </li>
            ))}
          </ul>
        );
      }

      // Tables
      if (section.includes("|")) {
        const rows = section.split("\n").filter((row) => row.trim());
        if (rows.length > 1) {
          const headers = rows[0]
            .split("|")
            .map((h) => h.trim())
            .filter((h) => h);
          const dataRows = rows.slice(2).map((row) =>
            row
              .split("|")
              .map((cell) => cell.trim())
              .filter((cell) => cell)
          );

          return (
            <div key={index} className="overflow-x-auto my-8">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map((header, i) => (
                      <th
                        key={i}
                        className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="px-6 py-4 text-sm text-gray-700 border-b"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 leading-relaxed my-6">
          {section}
        </p>
      );
    });
  };

  return <div className="prose max-w-none">{renderContent(post.content)}</div>;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug && p.published);

  if (!post) {
    notFound();
  }

  // Schema markup for FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Schema markup for article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "CourseLift Team",
    },
  };

  // Schema markup for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://courselift.xyz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://courselift.xyz/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://courselift.xyz/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: post.title, href: `/blog/${post.slug}` },
              ]}
            />
          </div>
        </div>

        {/* Article Header */}
        <article className="py-12 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
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

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-heading mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              {post.description}
            </p>

            {/* Content */}
            <BlogContent post={post} />

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-primary to-primary-hover text-white rounded-2xl p-8 lg:p-12 my-16">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Grow Your Course?
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Join 800+ course creators who use CourseLift to find students,
                automate marketing, and scale without ads.
              </p>
              <Link href="/">
                <Button className="bg-white text-primary hover:bg-gray-100 text-lg font-bold py-6 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Join the Waitlist (50% Early Bird Discount)
                </Button>
              </Link>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 my-16">
              <h2 className="text-2xl lg:text-3xl font-bold text-heading mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {post.faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-bold text-heading mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-bold text-heading mb-6">
                Continue Reading
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts
                  .filter((p) => p.slug !== post.slug && p.published)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group p-6 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors"
                    >
                      <h4 className="font-bold text-heading mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {relatedPost.description.substring(0, 100)}...
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}
