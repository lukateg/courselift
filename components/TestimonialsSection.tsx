import { Star } from "lucide-react";

import Image from "next/image";
import sasha from "@/public/images/sasa.jpg";
import len from "@/public/images/lena.jpg";
import mihailo from "@/public/images/mihailo.jpg";
import peter from "@/public/images/petar.jpg";
import dobrica from "@/public/images/dobrica.jpg";
import miha from "@/public/images/miha.jpg";

const testimonials2 = [
  {
    name: "Sasha T.",
    role: "Fitness Coach",
    quote: (
      <>
        {
          "I've been running in circles for months until this 7-1-5 Method gave me a clear roadmap. I finally understood who my audience really is and where to find them. Since applying these steps, my course signups have "
        }
        <span className="bg-yellow-200 text-heading px-1 rounded">
          {"doubled within a month!"}
        </span>
      </>
    ),
  },
  {
    name: "Lena N.",
    role: "Business Coach",
    quote: (
      <>
        {
          "I followed Luka’s 7-step plan and was surprised how simple it made marketing my course. The focus on tone of voice helped me connect with my ideal students on a way I never managed before. "
        }
        <span className="bg-yellow-200 text-heading px-1 rounded">
          {"Highly recommend!"}
        </span>
      </>
    ),
  },
  {
    name: "Mihailo I.",
    role: "Language Teacher",
    quote: (
      <>
        {
          "Before this, I was posting randomly on social media hoping someone would notice. The 7-1-5 Method helped me find exactly where my audience is and how to speak their language. Result? My course launch was "
        }
        <span className="bg-yellow-200 text-heading px-1 rounded">
          {"3x more successful than my last one."}
        </span>
      </>
    ),
  },
  {
    name: "Peter R.",
    role: "Fitness Coach",
    quote: (
      <>
        {
          "The audience audit step alone was eye-opening. I assumed my course was for everyone, but this system helped me get crystal clear on WHO and WHERE. If you want to actually sell courses, "
        }
        <span className="bg-yellow-200 text-heading px-1 rounded">
          {"this is the roadmap to follow."}
        </span>
      </>
    ),
  },
  {
    name: "Dobrica C.",
    role: "Productivity Trainer",
    quote: (
      <>
        {
          "Luka’s method is no-nonsense and actionable. I loved how it doesn’t waste my time with fluff — just a clear guide that leads to more course views, sales, and real growth. "
        }
        <span className="bg-yellow-200 text-heading px-1 rounded">
          {"The landing page insights were a game changer."}
        </span>
      </>
    ),
  },
  {
    name: "Michael I.",
    role: "All in one - QA testing",
    quote: (
      <>
        {
          "I’ve tried many marketing approaches but none were as structured and easy to implement as the 7-1-5 Method. The analytics and iterating tips helped me optimize fast and keep growing my revenue with less stress."
        }
      </>
    ),
  },
  {
    name: "Veljko R.",
    role: "Design Coach",
    quote: (
      <>
        {
          "This roadmap helped me ditch the overwhelm and finally built a step-by-step marketing plan for my course. The paid ads fundamentals opened my eyes to testing smartly and "
        }
        <span className="bg-yellow-200 text-heading px-1 rounded">
          {"saved me a fortune in ad spend."}
        </span>
      </>
    ),
  },
];

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sasha T.",
      role: "Fit After 50: Strength Training",
      quote: (
        <>
          {"Free course is great, but "}
          <span className="bg-yellow-200 text-heading px-1 rounded">
            {"I'm in for the analytics tool."}
          </span>
          {
            " I've spent an enormous amount of time trying to find out the number of people who are checking out my course but not buying it,"
          }
          <span className="bg-yellow-200 text-heading px-1 rounded">
            {"this is what I was waiting for!"}
          </span>
        </>
      ),
      avatar: sasha,
    },
    {
      name: "Lena N.",
      role: "The Science of Aging",
      quote: (
        <>
          {
            " I've passed these tips to the ChatGPT, and it found marketing angles I never thought of. "
          }
          <span className="bg-yellow-200 text-heading px-1 rounded">
            {
              "I'm on 10 sales milestone from yesterday, and I couldn't be happier!!!"
            }
          </span>
          {" Can't wait to automate this whole process with CourseLift"}
        </>
      ),
      avatar: len,
    },
    {
      name: "Mihailo I.",
      role: "Chefs CookBook",
      quote: (
        <>
          {
            "I don't know about you guys, but at this point, I trust this team with my house. I wrote down each step, and I now have actionable tasks to do every day, and the funniest thing is,"
          }
          <span className="bg-yellow-200 text-heading px-1 rounded">
            {
              "I've established communication with my audience on day 3. Bright days are coming!"
            }
          </span>
        </>
      ),
      avatar: mihailo,
    },
    {
      name: "Peter R.",
      role: "Small Spaces - Modern Homes",
      quote: (
        <>
          {
            "Honestly, I feel relieved now. All I ever wanted was just to earn money from sharing the knowledge I have, and the marketing is not my cup of tea."
          }
          <span className="bg-yellow-200 text-heading px-1 rounded">
            {"For anyone reading this, keep going!!!"}
          </span>
        </>
      ),
      avatar: peter,
    },
    {
      name: "Dobrica C.",
      role: "Marketing Secrets",
      quote: (
        <>
          {
            "It's funny, I came here just to see if this guy knows what he is talking about, but I'm a bit surprised. After this,"
          }
          <span className="bg-yellow-200 text-heading px-1 rounded">
            {"can't wait to see the app launch."}
          </span>
        </>
      ),
      avatar: dobrica,
    },
    {
      name: "Michael I.",
      role: "All in one - QA testing",
      quote: (
        <>
          {"I’ve tried many marketing approaches but none were as "}
          <span className="bg-yellow-200 text-heading px-1 rounded">
            {"structured and easy to implement "}
          </span>{" "}
          {"as the 7-1-5 Method. The analytics and iterating tips helped me "}
          {"optimize fast and keep growing my revenue with less stress."}
        </>
      ),
      avatar: miha,
    },
  ];

  return (
    <section className="bg-white py-20 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-6">
            Our Growing Wall of Love
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-lg flex justify-between flex-col"
            >
              <div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <blockquote className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
              </div>

              <div className="flex items-center">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-4">
                  <Image
                    className="rounded-full"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div className="font-bold text-heading">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
