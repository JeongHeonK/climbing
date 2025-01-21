"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DefaultGathering({ kind }: { kind: "home" | "mine" }) {
  const router = useRouter();

  const handleClick = () => {
    if (kind === "home") {
      return router.push("/newGathering");
    }

    return router.back();
  };

  return (
    <div className="flex flex-col items-center pt-36 gap-5">
      <h3 className="text-3xl">
        {kind === "home"
          ? "아직 생성된 모임이 없습니다."
          : "아직 찜한 모임이 없습니다."}
      </h3>
      <Button type="button" onClick={handleClick}>
        {kind === "home" ? "모임 만들기" : "찜하러 가기"}
      </Button>
    </div>
  );
}
