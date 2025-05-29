import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SortConfig } from "@/lib/custom-types";

type TableHeaderProps = {
  sortConfig: SortConfig;
  onSort: (key: "title" | "difficulty" | "accuracy") => void;
};

export default function TableHeader({ sortConfig, onSort }: TableHeaderProps) {
  function renderSortIcon(key: "title" | "difficulty" | "accuracy") {
    if (sortConfig.key !== key || sortConfig.direction === null) return null;

    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 inline ml-1" />
    );
  }

  function getHeaderClasses(key: "title" | "difficulty" | "accuracy") {
    const baseClasses =
      "px-6 py-4 text-left text-sm font-semibold transition-colors duration-200";
    const activeClasses =
      sortConfig.key === key && sortConfig.direction !== null
        ? "text-primary"
        : "text-muted-foreground hover:text-accent-foreground";

    return `${baseClasses} ${activeClasses}`;
  }

  return (
    <thead className="border-b border-border">
      <tr>
        <th
          className={`${getHeaderClasses("title")} w-[70%]`}
          onClick={() => onSort("title")}
        >
          <div className="flex items-center cursor-pointer">
            Problem Title
            {renderSortIcon("title")}
          </div>
        </th>
        <th
          className={`${getHeaderClasses("difficulty")} w-[15%]`}
          onClick={() => onSort("difficulty")}
        >
          <div className="flex items-center cursor-pointer">
            Difficulty
            {renderSortIcon("difficulty")}
          </div>
        </th>
        <th
          className={`${getHeaderClasses("accuracy")} w-[15%]`}
          onClick={() => onSort("accuracy")}
        >
          <div className="flex items-center cursor-pointer">
            Accuracy
            {renderSortIcon("accuracy")}
          </div>
        </th>
      </tr>
    </thead>
  );
}
