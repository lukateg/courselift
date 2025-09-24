import { CheckCircle } from "lucide-react";

export default function SolutionPreview() {
  const benefits = [
    "The exact 7-step system successful course creators use to find course students automatically",
    "Why your current marketing approach is actually pushing students away",
    "How AI can do 40+ hours of market research in just 10 minutes",
    "The secret places where your ideal students are hiding (most creators never look here)",
    // "Real case studies: How Jessica increased signups 340% and Mike generated $127,000",
  ];

  return (
    <section className="bg-gray-50 py-20 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
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
