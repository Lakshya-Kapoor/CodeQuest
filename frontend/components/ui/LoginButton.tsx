"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function LoginButton() {
  const router = useRouter();

  function handleLogin() {
    router.push("/login");
  }

  return (
    <Button onClick={handleLogin} className="hover:cursor-pointer">
      Login
    </Button>
  );
}
