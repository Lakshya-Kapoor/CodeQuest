"use server";

import { User } from "./custom-types";
import { cookies } from "next/headers";

export async function getUser(): Promise<false | User> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value || null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) return false;
  const data: User = await res.json();
  return data;
}
