"use client";

import DefaultGathering from "@/app/(home)/components/DefaultGathering";
import { IGathering } from "@/app/(home)/types/type";
import { useCallback, useEffect, useState } from "react";
import MyGatherings from "./MyGatherings";
import CardsSkeleton from "./CardsSkeleton";
import { getMyGatherings } from "../actions/gatheringActions";

export interface LikeButtonData {
  id: string;
  date: Date;
}

export default function MyGatheringScene({ isLogin }: { isLogin: boolean }) {
  const [myGatherings, setMyGatherings] = useState<IGathering[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = useCallback((id: string) => {
    setMyGatherings((prev) => prev.filter((gathering) => gathering._id !== id));
  }, []);

  useEffect(() => {
    const result = window.localStorage.getItem("mine");
    const updateMyGathering = async () => {
      if (!result) {
        return;
      }
      const myGatheringData: LikeButtonData[] = JSON.parse(result);
      const ids = myGatheringData.map((gathering) => gathering.id);
      const myGatherings = await getMyGatherings(ids);

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
      <h3 className="ml-7 p-1 font-semibold">My Climbing</h3>
      {myGatherings.length === 0 ? (
        <DefaultGathering kind="mine" />
      ) : (
        <MyGatherings
          myGatherings={myGatherings}
          isLogin={isLogin}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
