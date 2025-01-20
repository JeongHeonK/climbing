"use client";

import { useToggle } from "@/app/context/PopupContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { MouseEvent } from "react";

interface NewGatheringBtnProps {
  isLogin: boolean;
}

export default function NewGatheringBtn({ isLogin }: NewGatheringBtnProps) {
  const { toast } = useToast();
  const toggle = useToggle();

  const handleClick = (e: MouseEvent) => {
    if (!isLogin) {
      e.preventDefault();
      toggle();
      toast({ description: "로그인 후 이용해주세요" });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <Link href="/newGathering" onClick={handleClick}>
          <TooltipTrigger
            data-cy="newGathering"
            className="bg-black text-white text-2xl font-thin z-50 fixed bottom-10 right-6 rounded-full px-3 py-1"
          >
            +
          </TooltipTrigger>
        </Link>
        <TooltipContent>
          <p>모임 생성하기</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
