"use client";

import { useCallback, useState } from "react";
import { WithId } from "mongodb";
import PageButton from "@/app/(home)/components/PageButton";
import Gathering from "./Gathering";
import { IGathering } from "../types/type";
import GatheringsWrapper from "@/app/components/common/GatheringsWrapper";

export default function Gatherings({
  isLogin,
  initialGatherings,
}: {
  isLogin: boolean;
  initialGatherings: WithId<IGathering>[];
}) {
  const [gatherings, setGatherings] = useState(initialGatherings);

  const handleChangePages = useCallback((data: IGathering[]) => {
    setGatherings(data);
  }, []);

  return (
    <>
      <PageButton onChange={handleChangePages} />
      <GatheringsWrapper>
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
      </GatheringsWrapper>
    </>
  );
}
