import Link from "next/link";
import { getUser } from "@/lib/auth";
import LogoutButton from "./ui/LogoutButton";
import ThemeToggle from "./theme-toggle";
import Image from "next/image";
import { Button } from "./ui/button";

export default async function Navbar() {
  const user = await getUser();

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-background h-16 flex items-center justify-between px-10 shadow-lg border-b-2 border-border">
      <div className="flex items-center gap-14">
        <Link href="/">
          <Image
            src="/dark-logo.svg"
            alt="Logo"
            width={175}
            height={25}
            className="hidden dark:inline-block"
          />
          <Image
            src="/light-logo.svg"
            alt="Logo"
            width={175}
            height={25}
            className="dark:hidden"
          />
        </Link>
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
          {user && user.role === "admin" && (
            <Link
              href="/problems/create"
              className="text-lg hover:bg-secondary active:bg-sidebar px-3 py-1.5 rounded-full"
            >
              Create
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <LogoutButton />
        ) : (
          <Button asChild className="hover:scale-105">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
