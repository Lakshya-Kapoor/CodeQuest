"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body: any = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    if (type === "signup") {
      body["role"] = formData.get("role");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/${type}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      router.push("/problems");
    } else {
      console.error("Login failed");
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="bg-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">
                {type === "login" ? "Login" : "Signup"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  {type === "signup" && (
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select name="role" required defaultValue="user">
                        <SelectTrigger id="role" className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full hover:cursor-pointer">
                    {type === "login" ? "Login" : "Signup"}
                  </Button>
                </div>
                {type === "login" ? (
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="underline underline-offset-4"
                    >
                      Signup
                    </Link>
                  </div>
                ) : (
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
