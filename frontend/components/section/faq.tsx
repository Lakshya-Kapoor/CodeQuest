import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What programming languages does CodeQuest support?",
    answer:
      "As of now, CodeQuest supports python and c++ submissions. We are actively working on adding support for more languages like Java, JavaScript, and Go in the near future. You can select your preferred language when solving challenges.",
  },
  {
    question: "How are the challenges categorized?",
    answer:
      "Challenges are categorized by difficulty level (Easy, Medium, Hard)",
  },
  {
    question: "How can I create my own questions for the platform?",
    answer:
      "Admin accounts can create and manage questions through the admin dashboard. If you have a question you'd like to contribute, register as an admin and use the 'Create Question' feature.",
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 2xl:py-64"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            FAQ
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Find answers to common questions about CodeQuest and how it can help
            you improve your coding skills.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
