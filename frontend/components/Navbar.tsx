import Link from "next/link";
import { getUser } from "@/lib/auth";
import LogoutButton from "./ui/LogoutButton";
import LoginButton from "./ui/LoginButton";
import ThemeToggle from "./theme-toggle";

export default async function Navbar() {
  const user = await getUser();

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-background h-16 flex items-center justify-between px-10 shadow-lg border-b-2 border-border">
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
            className="text-lg hover:bg-secondary active:bg-sidebar px-3 py-1.5 rounded-full"
          >
            Problems
          </Link>
          <Link
            href="/discuss"
            className="text-lg hover:bg-secondary active:bg-sidebar px-3 py-1.5 rounded-full"
          >
            Discuss
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
}
