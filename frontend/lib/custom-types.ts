export type Problem = {
  _id: string;
  title: string;
  problemStatement: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  author: string;
  timeLimit: number;
  memoryLimit: number;
  createdAt: string;
  submissionCount: number;
  acceptedCount: number;
  accuracy?: number;
};

export type SortConfig = {
  key: "title" | "difficulty" | "accuracy" | null;
  direction: "asc" | "desc" | null;
};

export type Submission = {
  _id: string;
  language: Language;
  submittedAt: Date;
  problem: string;
  user: string;
  status:
    | "pending"
    | "accepted"
    | "wrong answer"
    | "runtime error"
    | "compile error"
    | "time limit exceeded"
    | "memory limit exceeded";
};

export type Language = "python" | "cpp";

export type User = {
  username: string;
  id: string;
  role: "user" | "admin";
  exp: number;
};
