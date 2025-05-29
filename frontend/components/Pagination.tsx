import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const buttonClass =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const activeClass = "bg-primary text-primary-foreground hover:cursor-pointer";
  const inactiveClass =
    "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:cursor-pointer";
  const disabledClass = "text-muted-foreground cursor-not-allowed";

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{currentPage}</span> of{" "}
          <span className="font-medium text-foreground">{totalPages}</span>{" "}
          pages
        </p>
      </div>
      <nav className="flex items-center space-x-1">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${buttonClass} ${
            currentPage === 1 ? disabledClass : inactiveClass
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button className={`${buttonClass} ${activeClass}`}>
          {currentPage}
        </button>

        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`${buttonClass} ${
            currentPage === totalPages ? disabledClass : inactiveClass
          }`}
          aria-label="Next Page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}
