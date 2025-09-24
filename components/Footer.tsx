import { BookOpen, Mail, Linkedin, Twitter, TrendingUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2C3E50] text-white py-12 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center space-x-2">
              [<TrendingUp className="text-[#FF6B35]" />]
              <span className="text-xl font-semibold font-robotomono text-white">
                Course<span className="text-[#FF6B35]">Lift</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-powered marketing solutions specifically designed for course
              creators.
            </p>
          </div>

          {/* Contact */}
          {/* <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail className="h-4 w-4" />
              <span className="text-sm">hello@coursemarketingai.com</span>
            </div>
          </div> */}

          {/* Legal */}
          {/* <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <div className="space-y-2">
              <div className="text-gray-300 text-sm hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </div>
              <div className="text-gray-300 text-sm hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </div>
            </div>
          </div> */}

          {/* Social */}
          {/* <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <div className="bg-white/10 hover:bg-white/20 rounded-full p-2 cursor-pointer transition-colors">
                <Linkedin className="h-4 w-4" />
              </div>
              <div className="bg-white/10 hover:bg-white/20 rounded-full p-2 cursor-pointer transition-colors">
                <Twitter className="h-4 w-4" />
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-4">
              Get course marketing tips on social media
            </p>
          </div> */}
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
