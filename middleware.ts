import { cookies } from "next/headers";
import { Auth } from "./app/api/auth";

export async function middleware() {
  const session = (await cookies()).get("session");
  if (session) {
    await Auth.updateSession();
  }
}

export const config = {
  matcher: "/",
};
