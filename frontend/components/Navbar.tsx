import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="h-16 flex items-center justify-between px-10 border-b-2 border-border">
      <div className="flex items-center gap-14">
        <div className="text-2xl flex gap-1 ">
          <span className="font-extrabold bg-blue-500 px-1.5 rounded-lg">
            {"<>"}
          </span>
          <span className="font-semibold">CodeQuest</span>
        </div>
        <div>
          <Link
            href="/problems"
            className="text-lg hover:bg-zinc-800 active:bg-zinc-900 px-3 py-1.5 rounded-full"
          >
            Problems
          </Link>
          <Link
            href="/discuss"
            className="text-lg hover:bg-zinc-800 active:bg-zinc-900 px-3 py-1.5 rounded-full"
          >
            Discuss
          </Link>
        </div>
      </div>
      <div>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </nav>
  );
}
