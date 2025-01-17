import { IGathering } from "@/app/(home)/types/type";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getGatherings } from "../actions/homeGatheringAction";

interface PageButtonProps {
  onChange: (data: IGathering[]) => void;
}
export default function PageButton({ onChange }: PageButtonProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(false);

  const handlePrevClick = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((p) => p - 1);
  };
  const handleNextClick = () => {
    if (nextDisabled) return;
    setCurrentPage((p) => p + 1);
  };

  useEffect(() => {
    const updateGatherings = async () => {
      const { gatherings: newGatherings, hasNext } =
        await getGatherings(currentPage);

      if (!hasNext) {
        setNextDisabled(true);
        onChange(newGatherings);
        return;
      }

      setNextDisabled(false);
      onChange(newGatherings);
    };
    updateGatherings();
  }, [currentPage, onChange]);

  return (
    <div className="px-8 md:px-8 flex gap-3 justify-end items-center -mt-8">
      <Button
        onClick={handlePrevClick}
        className="bg-slate-400"
        disabled={currentPage === 1}
      >
        &lt;
      </Button>
      <span>{currentPage}</span>
      <Button
        onClick={handleNextClick}
        className="bg-slate-400"
        disabled={nextDisabled}
      >
        &gt;
      </Button>
    </div>
  );
}
