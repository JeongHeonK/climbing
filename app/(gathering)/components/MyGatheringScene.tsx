"use client";

import DefaultGathering from "@/app/(home)/components/DefaultGathering";
import { MyGathering } from "@/app/(home)/types/type";
import { useEffect, useState } from "react";
import MyGatherings from "./MyGatherings";
import CardsSkeleton from "./CardsSkeleton";
import { getMyGathering } from "../actions/gatheringActions";

export interface LikeButtonData {
  id: string;
  date: Date;
}

export default function MyGatheringScene({ isLogin }: { isLogin: boolean }) {
  const [myGatherings, setMyGatherings] = useState<MyGathering[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = window.localStorage.getItem("mine");
    const updateMyGathering = async () => {
      if (!result) {
        return;
      }
      const myGatheringData: LikeButtonData[] = JSON.parse(result);
      const ids = myGatheringData.map((gathering) => gathering.id);
      const myGatherings = await getMyGathering(ids);
      setMyGatherings(myGatherings);
      setLoading(false);
    };
    updateMyGathering();
  }, []);

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
      <h3 className="ml-7 p-1 font-semibold">My Climbing </h3>
      {myGatherings.length === 0 ? (
        <DefaultGathering kind="mine" />
      ) : (
        <MyGatherings myGatherings={myGatherings} isLogin={isLogin} />
      )}
    </div>
  );
}
