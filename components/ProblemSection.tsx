import { X, TrendingDown } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    "I don't know where my students hang out online",
    "My content gets ignored while competitors thrive",
    "I spend more time marketing than teaching",
    "Marketing agencies charge $500/hour for basic advice"
  ];

  return (
    <section className="bg-white py-20 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-12">
          Stop Wasting Time on Marketing That Doesn't Work
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-red-50 rounded-lg">
              <div className="bg-red-500 rounded-full p-2 flex-shrink-0">
                <X className="h-4 w-4 text-white" />
              </div>
              <p className="text-gray-700 text-left font-medium">{problem}</p>
            </div>
          ))}
        </div>

        {/* Supporting Stat */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="flex items-center justify-center mb-4">
            <TrendingDown className="h-8 w-8 text-[#FF6B35] mr-3" />
            <span className="text-2xl font-bold text-[#2C3E50]">75%</span>
          </div>
          <p className="text-lg text-gray-600 italic">
            "Research shows that 75% of course creators struggle with marketing, not content quality"
          </p>
        </div>
      </div>
    </section>
  );
}