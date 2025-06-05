import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "CodeQuest",
  description: "A platform for coding questions",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
