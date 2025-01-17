"use client";

import { useCallback, useState } from "react";
import { WithId } from "mongodb";
import PageButton from "@/app/components/common/PageButton";
import Gathering from "./Gathering";
import { IGathering } from "../types/type";

export default function Gatherings({
  isLogin,
  initialGatherings,
}: {
  isLogin: boolean;
  initialGatherings: WithId<IGathering>[];
}) {
  const [gatherings, setGatherings] = useState(initialGatherings);

  const handleChangeGatherings = useCallback((data: IGathering[]) => {
    setGatherings(data);
  }, []);

  return (
    <>
      <PageButton onChange={handleChangeGatherings} />
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
