"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  generateKakaoScript,
  generateMap,
  generateMarker,
  getDate,
} from "../util";

export interface GatheringDetailProps {
  _id: string;
  user: string;
  title: string;
  date: Date;
  lat: number;
  lng: number;
  description: string;
}

export default function GatheringDetail({
  _id,
  user,
  title,
  date,
  lat,
  lng,
  description,
}: GatheringDetailProps) {
  const newDate = getDate(date);

  useEffect(() => {
    const kakaoMapScript = generateKakaoScript();

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const id = _id.concat("1");
        const map = generateMap(id, lat, lng);
        const marker = generateMarker(map);

        marker.setMap(map);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
    };
  }, [_id, lat, lng]);

  return (
    <Card className="fixed top-32 right-0 gap-2 left-0 mx-auto max-w-[400px] flex flex-col py-2 px-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex justify-between">
          <CardDescription>{user}</CardDescription>
          <CardDescription>{newDate}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap">{description}</CardContent>
      <div id={`${_id}1`} className="size-72 self-center rounded-md mb-8" />
    </Card>
  );
}
