import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Lucia, TimeSpan } from "lucia";
import { Collection } from "mongodb";
import { connectDB } from "./database";

interface UserDoc {
  _id: string;
}

interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}

const db = (await connectDB).db("climbing");
const Session = db.collection("Sessions") as Collection<SessionDoc>;
const UserSession = db.collection("UserSession") as Collection<UserDoc>;
const adapter = new MongodbAdapter(Session, UserSession);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, "w"), // 2 weeks
});

export default async function getSession(userId: string) {
  const session = await lucia.createSession(userId, {});

  return session;
}
