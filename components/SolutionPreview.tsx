import { CheckCircle } from "lucide-react";

export default function SolutionPreview() {
  const benefits = [
    "The first thing successful creators do before they even start building a course.",
    "Why 90% of online courses never pass 10 sales — and how to make sure yours isn’t one of them.",
    "The trick to creating a consistent, professional tone of voice that builds instant trust.",
    "The 3 must-have elements of a high-converting landing page that does most of the selling for you.",
    "How to spot what’s broken in your funnel using just a few simple analytics.",
    "The secret to scaling faster with affiliates and micro-influencers who already have your audience’s trust.",
  ];

  return (
    <section className="bg-gray-50 py-20 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-6">
            What You&apos;ll Discover in This Free Training
          </h2>
        </div>

        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
