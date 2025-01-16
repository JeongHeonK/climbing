"use client";

import DefaultGathering from "@/app/(home)/components/DefaultGathering";
import { MyGathering } from "@/app/(home)/types/type";
import { useEffect, useState } from "react";
import MyGatherings from "./MyGatherings";

export interface LikeButtonData {
  id: string;
  date: Date;
}

export default function MyGatheringScene({ isLogin }: { isLogin: boolean }) {
  const [myGatherings, setMyGatherings] = useState<MyGathering[]>([]);

  useEffect(() => {
    const result = window.localStorage.getItem("mine");

    if (!result) {
      return;
    }
    const newMyGathering: LikeButtonData[] = JSON.parse(result);
    const ids = newMyGathering.map((gathering) => gathering.id);
    console.log(ids);
    setMyGatherings([]);
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto">
      <h3 className="ml-7 p-1 font-semibold">Join us</h3>
      {myGatherings.length === 0 ? (
        <DefaultGathering kind="mine" />
      ) : (
        <MyGatherings myGatherings={myGatherings} isLogin={isLogin} />
      )}
    </div>
  );
}
