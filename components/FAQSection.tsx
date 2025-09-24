import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "How is this different from generic marketing tools?",
      answer:
        "We're built specifically for course creators. Every feature addresses the unique challenges of teaching and selling knowledge online.",
    },
    {
      question: "What if I don't have a course yet?",
      answer:
        "Perfect! Our system includes course idea validation to help you pick winning topics before you build.",
    },
    {
      question: "Do I need technical skills?",
      answer:
        "Zero. Just describe your course topic and our AI handles everything else. No coding, no complicated setup.",
    },
    {
      question: "When does this launch?",
      answer:
        "We're launching in October 2025. Early access members get first access plus 50% off.",
    },
    {
      question: "What's included in early access?",
      answer:
        "You get 50% off for the first year, free course validation tool, marketing playbook, and direct email access to me for questions.",
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
