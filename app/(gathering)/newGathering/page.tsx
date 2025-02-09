import { Metadata } from "next";
import NewGatheringPageScene from "../components/newGatheringScene";

export const metadata: Metadata = {
  title: "모임 생성 페이지",
  description: "모임 생성 페이지 입니다.",
};

export default function NewGatheringPage() {
  return <NewGatheringPageScene />;
}
