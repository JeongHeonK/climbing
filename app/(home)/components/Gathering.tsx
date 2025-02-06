"use client";

import { MouseEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { stopBubbling } from "@/app/util";
import { loadKakaoAPI, generateKakaoScript, getDate } from "../util";
import LikeButton from "./LikeButton";
import { usePopupStore } from "@/app/store/store";

interface GatheringProps {
  id: string;
  user: string;
  title: string;
  date: Date;
  lat: number;
  lng: number;
  isLogin: boolean;
  onDelete?: (id: string) => void;
}

export default function Gathering({
  id,
  user,
  title,
  date,
  lat,
  lng,
  isLogin,
  onDelete,
}: GatheringProps) {
  const newDate = getDate(date);
  const { toast } = useToast();
  const toggle = usePopupStore((state) => state.toggle);
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    if (!isLogin) {
      e.preventDefault();
      toggle();
      toast({ description: "로그인 후 이용해주세요" });
      return;
    }
    router.push(`/detail/${id}`, { scroll: false });
  };

  useEffect(() => {
    const kakaoMapScript = generateKakaoScript();
    const onLoad = () => loadKakaoAPI(id, lat, lng);
    kakaoMapScript.addEventListener("load", onLoad);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoad);
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
      <CardHeader className="relative p-0 py-2 my-3 cursor-pointer">
        <CardTitle>{title}</CardTitle>
        <LikeButton id={id} date={date} onDelete={onDelete} />
        <div className="flex justify-between items-center cursor-pointer">
          <CardDescription>{newDate}</CardDescription>
          <CardDescription>{user}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
