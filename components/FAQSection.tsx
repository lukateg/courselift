import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "How is CourseLift different from generic marketing tools?",
      answer:
        "We're built exclusively for course creators. Every feature addresses the unique challenges of teaching and selling knowledge online—from audience research to content calendars to landing page analytics. Generic tools make you adapt; CourseLift adapts to you.",
    },
    {
      question: "What if I don't have a course yet?",
      answer:
        "Even better! Starting with the right audience and positioning saves months of trial and error. CourseLift helps you validate your course idea before you build, ensuring you create something people actually want to buy.",
    },
    {
      question: "Do I need technical or marketing skills?",
      answer:
        "Absolutely not. Just describe your course topic, format, and language—it takes 2 minutes. Our AI handles the research, strategy, and content generation. No coding, no complicated setup, no marketing degree required.",
    },
    {
      question: "When does CourseLift launch and what's included?",
      answer:
        "We're launching in October 2025. Early access members get 50% off for life ($24/month instead of $48), priority support, and all future features included at no extra cost.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes! There's no lock-in contract. You can cancel your subscription anytime. We also offer a 30-day money-back guarantee—if CourseLift doesn't help you, we'll refund you, no questions asked.",
    },
    {
      question:
        "Does this work with my course platform (Teachable, Kajabi, etc.)?",
      answer:
        "Yes! CourseLift works seamlessly with all major course platforms. We focus on marketing and audience growth, not hosting courses, so we integrate with whatever platform you use or plan to use.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] text-center mb-12">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white mb-4 rounded-lg border shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-[#2C3E50] hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
