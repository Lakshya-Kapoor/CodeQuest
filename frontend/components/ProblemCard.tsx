import React from "react";
import { Clock, HardDrive, Check } from "lucide-react";
import { Problem } from "../types";
import DifficultyBadge from "./ui/DifficultyBadge";
import TagBadge from "./ui/TagBadge";
import {
  formatAccuracy,
  formatDate,
  formatMemoryLimit,
  formatTimeLimit,
  truncateText,
} from "../utils/formatters";

type ProblemCardProps = {
  problem: Problem;
  onClick: (problem: Problem) => void;
  isSelected?: boolean;
};

const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onClick,
  isSelected = false,
}) => {
  const {
    title,
    difficulty,
    tags,
    accuracy,
    timeLimit,
    memoryLimit,
    createdAt,
    problemStatement,
  } = problem;

  return (
    <div
      className={`relative bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
        isSelected
          ? "ring-2 ring-indigo-500 border-transparent"
          : "border-gray-200 hover:border-indigo-200"
      }`}
      onClick={() => onClick(problem)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <DifficultyBadge difficulty={difficulty} />
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {truncateText(problemStatement, 120)}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
              +{tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-gray-400" />
              <span>{formatTimeLimit(timeLimit)}</span>
            </div>
            <div className="flex items-center gap-1">
              <HardDrive size={14} className="text-gray-400" />
              <span>{formatMemoryLimit(memoryLimit)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Check
              size={14}
              className={accuracy > 0.6 ? "text-emerald-500" : "text-amber-500"}
            />
            <span
              className={accuracy > 0.6 ? "text-emerald-600" : "text-amber-600"}
            >
              {formatAccuracy(accuracy)}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-2 pb-3 px-5 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
        <span>Added: {formatDate(createdAt)}</span>
        <span>By: {problem.author}</span>
      </div>
    </div>
  );
};

export default ProblemCard;
