import { cookies } from "next/headers";
import { Auth } from "./app/api/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = (await cookies()).get("session");
  const response = NextResponse.next();

  if (request.url.endsWith("/") && session) {
    await Auth.updateSession();
    response.cookies.set("isLogin", "true");
    return response;
  }

  if (request.url.includes("/newGathering") && !session) {
    response.cookies.set("isLogin", "false");
    return NextResponse.rewrite(new URL("/", request.nextUrl));
  }

  if (request.url.includes("/myClimbing") && !session) {
    response.cookies.set("isLogin", "false");
    return NextResponse.rewrite(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/newGathering", "/myClimbing"],
};
