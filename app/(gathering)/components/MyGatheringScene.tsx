"use client";

import { useEffect, useState } from "react";
import DefaultGathering from "@/app/(home)/components/DefaultGathering";
import MyGatherings from "./MyGatherings";
import CardsSkeleton from "./CardsSkeleton";
import { getMyGatherings } from "../actions/gatheringActions";
import { useMyGatheringsStore } from "@/app/store/store";

export interface LikeButtonData {
  id: string;
  date: Date;
}

export default function MyGatheringScene({ isLogin }: { isLogin: boolean }) {
  const [loading, setLoading] = useState(true);
  const myGatherings = useMyGatheringsStore((state) => state.myGatherings);
  const setMyGatherings = useMyGatheringsStore((state) => state.setGatherings);

  useEffect(() => {
    const result = window.localStorage.getItem("mine");
    const updateMyGathering = async () => {
      if (result) {
        const myGatheringData: LikeButtonData[] = JSON.parse(result);
        const ids = myGatheringData.map((gathering) => gathering.id);
        const myGatherings = await getMyGatherings(ids);

        setMyGatherings(myGatherings);
      }
      setLoading(false);
    };
    updateMyGathering();
  }, [setMyGatherings]);

  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto">
        <h3 className="ml-7 p-1 font-semibold">My Climbing </h3>
        <CardsSkeleton count={3} />;
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto">
      <h3 className="ml-7 p-1 font-semibold">My Climbing</h3>
      {myGatherings === undefined ? (
        <DefaultGathering kind="mine" />
      ) : (
        <MyGatherings isLogin={isLogin} />
      )}
    </div>
  );
}
