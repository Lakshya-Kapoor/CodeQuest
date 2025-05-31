"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.refresh();
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}
