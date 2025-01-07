import { cookies } from "next/headers";
import { Auth } from "./app/api/auth";
import { NextResponse } from "next/server";

export async function middleware(request: NextResponse) {
  const session = (await cookies()).get("session");
  if (request.url.endsWith("/") && session) {
    await Auth.updateSession();
  }

  if (request.url.includes("/detail") && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/detail"],
};
