import {
  Code2,
  BrainCircuit,
  LightbulbIcon,
  ThumbsUp,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: <Code2 className="h-10 w-10 text-primary" />,
    title: "Choose a Question",
    description:
      "Browse through coding Questions across different difficulty levels and topics.",
    color: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "Solve the Problem",
    description:
      "Write your solution in your preferred programming language and test it against various test cases.",
    color: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    icon: <LightbulbIcon className="h-10 w-10 text-primary" />,
    title: "Learn and Improve",
    description:
      "Get instant feedback, review optimal solutions, and learn new techniques and approaches.",
    color: "bg-green-100 dark:bg-green-900/20",
  },
  {
    icon: <ThumbsUp className="h-10 w-10 text-primary" />,
    title: "Track Progress",
    description:
      "Monitor your improvements, identify weak areas, and follow personalized learning recommendations.",
    color: "bg-yellow-100 dark:bg-yellow-900/20",
  },
  {
    icon: <Trophy className="h-10 w-10 text-primary" />,
    title: "Compete and Share",
    description:
      "Participate in competitions, share your solutions, and connect with other developers.",
    color: "bg-red-100 dark:bg-red-900/20",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Your Journey to Coding Mastery
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Follow these simple steps to improve your coding skills and become
              a better programmer.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10 -translate-x-1/2 z-0"></div>

          <div className="grid gap-8 md:gap-16 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:justify-end" : ""
                } items-center md:items-start gap-6`}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:order-2 md:pl-8" : "md:pr-8"
                  }`}
                >
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className={`rounded-full p-4 ${step.color} mb-4`}>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary shadow-lg items-center justify-center"
                  style={{ top: `${index * 200 + 30}px` }}
                >
                  <span className="text-primary-foreground font-bold">
                    {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
