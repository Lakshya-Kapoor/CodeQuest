"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProblemDetailsNav() {
  const pathname = usePathname();
  const { id } = useParams();

  const navItems = [
    { label: "Problem", href: `/problems/${id}` },
    { label: "Submissions", href: `/problems/${id}/submissions` },
    { label: "Solution", href: `/problems/${id}/solution` },
  ];

  return (
    <Tabs defaultValue={pathname} value={pathname}>
      <TabsList className="gap-4">
        {navItems.map((item) => (
          <TabsTrigger key={item.href} value={item.href} asChild>
            <Link href={item.href}>{item.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
