import { cookies } from "next/headers";
import { User } from "./custom-types";

export async function getUser(): Promise<false | User> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/user`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken}`,
    },
  });

  if (!res.ok) return false;
  const data: User = await res.json();
  return data;
}
