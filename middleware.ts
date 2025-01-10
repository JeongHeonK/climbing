import { cookies } from "next/headers";
import { Auth } from "./app/api/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = (await cookies()).get("session");

  if (request.url.endsWith("/") && session) {
    await Auth.updateSession();
    return NextResponse.next();
  }

  if (request.url.includes("/newGathering") && !session) {
    return NextResponse.rewrite(new URL("/", request.nextUrl));
  }

  if (request.url.includes("/myClimbing") || !session) {
    return NextResponse.rewrite(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/newGathering", "/myClimbing"],
};
