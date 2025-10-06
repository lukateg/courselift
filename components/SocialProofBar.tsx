import { Users } from "lucide-react";

import Image from "next/image";
import teachableLogo from "@/public/images/teachable.svg";
import kajabiLogo from "@/public/images/kajabi.svg";
import thinkificLogo from "@/public/images/thinkfic.svg";
import udemyLogo from "@/public/images/udemy.svg";

export default function SocialProofBar() {
  return (
    <section className="bg-gray-50 py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Users className="h-5 w-5 text-primary mr-2" />
            <span className="text-gray-600 font-medium">
              Join 800+ course creators already on the waitlist
            </span>
          </div>

          {/* Platform Logos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-16">
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border flex justify-center items-center">
              <Image
                src={teachableLogo}
                alt="Teachable"
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border flex justify-center items-center">
              <Image
                src={kajabiLogo}
                alt="Kajabi"
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border flex justify-center items-center">
              <Image
                src={thinkificLogo}
                alt="Thinkific"
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border flex justify-center items-center">
              <Image
                src={udemyLogo}
                alt="Udemy"
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Works with all major course platforms
          </p>
        </div>
      </div>
    </section>
  );
}
