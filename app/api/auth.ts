import "server-only";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SEVEN_DAY, ONE_DAY } from "../constant/constant";
// import { date } from "zod";

export class Auth {
  private static secretKey = process.env.SESSION_SECRET;
  private static encodedKey = new TextEncoder().encode(Auth.secretKey);

  private static encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(Auth.encodedKey);
  }

  private static async decrypt(session: string | undefined = "") {
    try {
      const { payload } = await jwtVerify(session, Auth.encodedKey, {
        algorithms: ["HS256"],
      });

      return payload;
    } catch (err) {
      const error = err as string;
      throw new Error(error);
    }
  }

  static async createSession(userId: string) {
    const expiresAt = new Date(Date.now() + SEVEN_DAY);
    const session = await Auth.encrypt({ userId, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  }

  static async updateSession() {
    const session = (await cookies()).get("session")?.value;
    const payload = await Auth.decrypt(session);

    if (!session || !payload) return;

    const isOverADay = (date: string) => {
      const sessionLeft = new Date(date);
      const today = new Date();
      return Number(sessionLeft) - Number(today) > ONE_DAY;
    };

    if (isOverADay(payload.expiresAt as string)) return;

    const expires = new Date(Date.now() + SEVEN_DAY);

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires,
      sameSite: "lax",
      path: "/",
    });
  }

  private static async deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  }

  static async logout() {
    Auth.deleteSession();
    redirect("/");
  }
}
