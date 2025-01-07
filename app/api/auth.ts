import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SEVEN_DAY } from "../constant/constant";

export class Auth {
  private static secretKey = process.env.SESSION_SECRET;
  private static encodedKey = new TextEncoder().encode(this.secretKey);

  static encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(this.encodedKey);
  }

  static async decrypt(session: string | undefined = "") {
    try {
      const { payload } = await jwtVerify(session, this.encodedKey, {
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
}
