"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { generateMap, generateMarker, generateKakaoScript } from "../util";

interface GatheringProps {
  title: string;
  date: Date;
  location: string;
  id: string;
}

export default function Gathering({
  title,
  date,
  location,
  id,
}: GatheringProps) {
  const newDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  useEffect(() => {
    const kakaoMapScript = generateKakaoScript();

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const map = generateMap(id);
        const marker = generateMarker();

        marker.setMap(map);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, [id]);
  return (
    <Card className="hover:-translate-y-2 transition-all mx-auto p-1 pb-0">
      <CardHeader className="pb-2 mb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{newDate}</CardDescription>
      </CardHeader>
      <CardContent className="align-middle -mb-2">
        <div id={id} className="size-44 mx-auto rounded-md" />
        <p className="mt-4 mb-1">{location}</p>
      </CardContent>
    </Card>
  );
}
