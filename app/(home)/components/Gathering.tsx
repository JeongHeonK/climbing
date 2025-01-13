"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MouseEvent, useEffect } from "react";
import { useToggle } from "@/app/context/PopupContext";
import { useToast } from "@/hooks/use-toast";
import {
  generateMap,
  generateMarker,
  generateKakaoScript,
  getDate,
} from "../util";

interface GatheringProps {
  title: string;
  date: Date;
  id: string;
  isLogin: boolean;
}

export default function Gathering({
  title,
  date,
  id,
  isLogin,
}: GatheringProps) {
  const newDate = getDate(date);
  const { toast } = useToast();
  const toggle = useToggle();

  const handleClick = (e: MouseEvent) => {
    if (!isLogin) {
      e.preventDefault();
      toggle();
      toast({ description: "로그인 후 이용해주세요" });
    }
  };

  useEffect(() => {
    const kakaoMapScript = generateKakaoScript();

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const map = generateMap(id);
        const marker = generateMarker(map);

        marker.setMap(map);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
    };
  }, [id]);

  return (
    <Card
      className="hover:-translate-y-2 transition-all mx-auto px-4 pt-4 pb-0"
      onClick={handleClick}
    >
      <div
        id={id}
        className="size-48 mx-auto rounded-md border border-slate-200"
      />
      <CardHeader className="p-0 py-2 my-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{newDate}</CardDescription>
      </CardHeader>
    </Card>
  );
}
