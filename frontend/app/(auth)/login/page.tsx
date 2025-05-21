"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

export default function Page() {
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    const BASE_URL = "http://localhost:8000";
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Login successful", data);
      // Handle successful login (e.g., redirect, show success message)
    } else {
      console.error("Login failed");
      // Handle login failure (e.g., show error message)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="bg-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full hover:cursor-pointer">
                    Login
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
