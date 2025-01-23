import "server-only";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SEVEN_DAY } from "../constant/constant";
import { isOverADay } from "../util";

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
    await Auth.deleteSession();
  }

  static async getUsername(session: string) {
    const payload = await Auth.decrypt(JSON.parse(session));
    return payload.userId as string;
  }
}
