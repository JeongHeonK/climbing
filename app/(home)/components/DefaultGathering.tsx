"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DefaultGathering() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/newGathering");
  };
  return (
    <div className="flex flex-col items-center pt-36 gap-5">
      <h3 className="text-3xl">생성된 모임이 없습니다.</h3>
      <Button type="button" onClick={handleClick}>
        모임 만들기
      </Button>
    </div>
  );
}
