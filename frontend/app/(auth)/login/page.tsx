"use client";

import AuthForm from "@/components/AuthForm";

export default function Page() {
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("access_token", `Bearer ${data.access_token}`);
    } else {
      console.error("Login failed");
    }
  }

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
