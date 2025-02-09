import { cookies } from "next/headers";
import { Metadata } from "next";
import MyGatheringScene from "../components/MyGatheringScene";

export const metadata: Metadata = {
  title: "내 모임",
  description: "찜하기 표시한 내 모임을 보여주는 페이지 입니다.",
};

export default async function MyClimbingPage() {
  const session = (await cookies()).get("session");
  const isLogin = session !== undefined;

  return <MyGatheringScene isLogin={isLogin} />;
}
