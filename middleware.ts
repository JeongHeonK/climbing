import { cookies } from "next/headers";
import { Auth } from "./app/api/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = (await cookies()).get("session");
  if (request.url.endsWith("/") && session) {
    await Auth.updateSession();
  }

  if (request.url.includes("/detail") && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.url.includes("/myClimbing") && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/myClimbing"],
};
