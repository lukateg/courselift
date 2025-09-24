import { BookOpen, TrendingUp } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white py-4 px-4 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            [<TrendingUp className="text-[#FF6B35]" />]
            <span className="text-xl font-semibold font-robotomono text-[#2C3E50]">
              Course<span className="text-[#FF6B35]">Lift</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
