"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { WithId } from "mongodb";
import Gathering from "./Gathering";
import { getGatherings, IGathering } from "../actions/getGatherings";

export default function Gatherings({
  isLogin,
  initialGatherings,
}: {
  isLogin: boolean;
  initialGatherings: WithId<IGathering>[];
}) {
  const [gatherings, setGatherings] = useState(initialGatherings);
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
        return;
      }

      setNextDisabled(false);

      setGatherings(newGatherings);
    };
    updateGatherings();
  }, [currentPage]);

  return (
    <>
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
      <div className="px-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 py-2 px-12 md:px-3 mx-auto">
        {gatherings.map((gathering) => {
          return (
            <Gathering
              key={gathering._id}
              id={gathering._id.toString()}
              user={gathering.user}
              title={gathering.title}
              lat={Number(gathering.lat)}
              lng={Number(gathering.lng)}
              date={gathering.date}
              isLogin={isLogin}
            />
          );
        })}
      </div>
    </>
  );
}
