import { BarChart2, HardDrive, Target, TimerIcon } from "lucide-react";
import { Problem } from "@/lib/custom-types";
import ReactMarkdown from "react-markdown";
import TagBadge from "../TagBadge";
import DifficultyBadge from "../DifficultyBadge";
import AccuracyBar from "../ui/AccuracyBar";

export default function ProblemPage({ problem }: { problem: Problem }) {
  return (
    <div className="border border-border p-7 rounded-lg flex flex-col items-start gap-5">
      <h1 className="text-3xl font-bold text-primary">{problem.title}</h1>
      {problem.tags.length > 0 && (
        <div className="flex items-center gap-2">
          {problem.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
      <div className="border border-border rounded-lg bg-sidebar p-4 flex items-center justify-between self-stretch transition-colors duration-200">
        <span className="flex flex-col items-start gap-1.5">
          <span className="flex items-center text-sm gap-1.5 text-muted-foreground ">
            <TimerIcon size={16} /> Time Limit
          </span>
          <span className="text-sm text-primary">{problem.timeLimit} sec</span>
        </span>
        <span className="flex flex-col items-start gap-1.5">
          <span className="flex items-center text-sm gap-1.5 text-muted-foreground ">
            <HardDrive size={16} /> Memory Limit
          </span>
          <span className="text-sm text-primary">{problem.memoryLimit} MB</span>
        </span>
        <span className="flex flex-col items-start gap-1.5">
          <span className="flex items-center text-sm gap-1.5 text-muted-foreground ">
            <BarChart2 size={16} /> Difficulty
          </span>
          <DifficultyBadge difficulty={problem.difficulty} />
        </span>
        <span className="flex flex-col items-start gap-1.5">
          <span className="flex items-center text-sm gap-1.5 text-muted-foreground ">
            <Target size={16} /> Accuracy
          </span>
          <AccuracyBar accuracy={problem.accuracy!} />
        </span>
      </div>

      <div className="problem-statement self-stretch flex flex-col">
        <ReactMarkdown>{problem.problemStatement}</ReactMarkdown>
      </div>
    </div>
  );
}
