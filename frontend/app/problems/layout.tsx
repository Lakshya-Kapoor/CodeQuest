import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Problems - CodeQuest",
  description: "View all problems on CodeQuest",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col items-center p-10">
        {children}
      </main>
    </>
  );
}
