"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const codeSnippet = `function solveProblem(input) {
  // Your solution here
  const result = input
    .split(' ')
    .map(x => parseInt(x))
    .filter(x => x > 0)
    .reduce((a, b) => a + b, 0);
    
  return result;
}

// Test your code
console.log(solveProblem("5 -3 7 2"));
// Output: 14`;

const AnimatedCodeBlock = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= codeSnippet.length) {
        setText(codeSnippet.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-secondary/50 backdrop-blur-sm rounded-lg border shadow-md p-4 font-mono text-sm overflow-hidden w-full max-w-md">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-3 w-3 rounded-full bg-destructive"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <span className="text-xs text-muted-foreground ml-2">problem.js</span>
      </div>
      <pre className="text-left">
        <code className="text-xs sm:text-sm">{text}</code>
      </pre>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="w-full relative py-12 md:py-24 lg:py-32 xl:py-48 2xl:py-56">
      <div className="flex justify-between items-center">
        <div>
          <div className="rounded-t-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Welcome to CodeQuest
          </div>
          <div className="flex flex-col justify-center space-y-6 border border-border rounded-b-lg p-5">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-[450px]">
              Master Coding Through Practice
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Create, solve, and share coding problems. Improve your skills, and
              build your developer profile on CodeQuest.
            </p>
            <div>
              <Button size="lg" asChild>
                <Link href="/problems">
                  Start Solving <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-[500px]">
          <AnimatedCodeBlock />
        </div>
      </div>
    </section>
  );
}
