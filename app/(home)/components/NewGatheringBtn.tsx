import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function NewGatheringBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <Link href="/newGathering">
          <TooltipTrigger className="bg-black text-white text-2xl font-thin z-50 fixed bottom-10 right-6 rounded-full px-3 py-1">
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
