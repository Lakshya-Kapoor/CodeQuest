"use client";

import { useState, useMemo, useEffect } from "react";
import { Problem, SortConfig } from "@/lib/custom-types";
import TableHeader from "./ui/ProblemTableHeader";
import TableRow from "./ui/ProblemTableRow";
import SearchBar from "./ui/SearchBar";
import Pagination from "./ui/Pagination";

const PROBLEMS_PER_PAGE = 50;

export default function ProblemsTable({ problems }: { problems: Problem[] }) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Handle column sorting
  function handleSort(key: "title" | "difficulty" | "accuracy") {
    let direction: "asc" | "desc" | null = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  }

  // Filter and sort problems
  const filteredAndSortedProblems = useMemo(() => {
    // First filter by search term
    let result = problems.filter((problem) =>
      problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Then apply sorting if applicable
    if (sortConfig.key && sortConfig.direction) {
      result = result.sort((a, b) => {
        if (sortConfig.key === "difficulty") {
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          const valA = difficultyOrder[a[sortConfig.key]];
          const valB = difficultyOrder[b[sortConfig.key]];

          return sortConfig.direction === "asc" ? valA - valB : valB - valA;
        }

        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [problems, searchTerm, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredAndSortedProblems.length / PROBLEMS_PER_PAGE
  );

  // Get current page of problems
  const currentProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * PROBLEMS_PER_PAGE;
    return filteredAndSortedProblems.slice(
      startIndex,
      startIndex + PROBLEMS_PER_PAGE
    );
  }, [filteredAndSortedProblems, currentPage]);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg border border-border mx-auto">
      <div className="px-6 py-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <TableHeader sortConfig={sortConfig} onSort={handleSort} />
          <tbody className="divide-y divide-border">
            {currentProblems.length > 0 ? (
              currentProblems.map((problem) => (
                <TableRow key={problem._id} problem={problem} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No problems found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-2 border-t border-border">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
