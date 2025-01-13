import { cookies } from "next/headers";
import { Auth } from "./app/api/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("session");
  const response = NextResponse.next();

  if (request.url.endsWith("/") && session) {
    await Auth.updateSession();

    return response;
  }

  if (request.url.includes("/newGathering") && !session) {
    return NextResponse.rewrite(new URL("/", request.nextUrl));
  }

  if (request.url.includes("/myClimbing") && !session) {
    return NextResponse.rewrite(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/newGathering", "/myClimbing"],
};
