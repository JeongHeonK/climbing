import { cookies } from "next/headers";
import MyGatheringScene from "../components/MyGatheringScene";

export default async function MyClimbingPage() {
  const session = (await cookies()).get("session");
  const isLogin = session !== undefined;

  return <MyGatheringScene isLogin={isLogin} />;
}
