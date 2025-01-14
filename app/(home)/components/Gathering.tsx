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
import { stopBubbling } from "@/app/util";
import { useRouter } from "next/navigation";
import {
  generateMap,
  generateMarker,
  generateKakaoScript,
  getDate,
} from "../util";

interface GatheringProps {
  id: string;
  user: string;
  title: string;
  date: Date;
  lat: number;
  lng: number;
  isLogin: boolean;
}

export default function Gathering({
  id,
  user,
  title,
  date,
  lat,
  lng,
  isLogin,
}: GatheringProps) {
  const newDate = getDate(date);
  const { toast } = useToast();
  const toggle = useToggle();
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    if (!isLogin) {
      e.preventDefault();
      toggle();
      toast({ description: "로그인 후 이용해주세요" });
      return;
    }
    router.push(`/detail/${id}`);
  };

  useEffect(() => {
    const kakaoMapScript = generateKakaoScript();

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const map = generateMap(id, lat, lng);
        const marker = generateMarker(map);

        marker.setMap(map);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
    };
  }, [id, lat, lng]);

  return (
    <Card
      className="hover:-translate-y-2 transition-all mx-auto px-4 pt-4 pb-0 cursor-pointer"
      onClick={handleClick}
    >
      <div
        id={id}
        className="size-48 mx-auto rounded-md border border-slate-200"
        onClick={stopBubbling}
      />
      <CardHeader className="p-0 py-2 my-3 cursor-pointer">
        <CardTitle>{title}</CardTitle>
        <div className="flex justify-between items-center cursor-pointer">
          <CardDescription>{newDate}</CardDescription>
          <CardDescription>{user}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
