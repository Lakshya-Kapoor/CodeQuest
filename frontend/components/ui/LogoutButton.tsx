"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.refresh();
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}
