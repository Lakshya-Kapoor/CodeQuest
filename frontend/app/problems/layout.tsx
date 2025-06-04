import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Problems - CodeQuest",
  description: "View all problems on CodeQuest",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="2xl:w-[75%] xl:w-[85%] w-full mx-auto space-y-4 p-10">
      {children}
    </main>
  );
}
