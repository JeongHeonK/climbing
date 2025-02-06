"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { stopBubbling } from "@/app/util";
import { generateKakaoScript, getDate, loadKakaoAPI } from "../util";

export interface GatheringDetailProps {
  _id: string;
  user: string;
  title: string;
  date: Date;
  lat: number;
  lng: number;
  description: string;
  isAuthor: boolean;
}

export default function GatheringDetail({
  _id,
  user,
  title,
  date,
  lat,
  lng,
  description,
  isAuthor,
}: GatheringDetailProps) {
  const router = useRouter();
  const isEditableDate = date.getTime() > new Date().getTime();
  const newDate = getDate(date);

  const handleClick = () => {
    router.push(`/editGathering?id=${_id}`);
  };

  useEffect(() => {
    const kakaoMapScript = generateKakaoScript();
    const newId = _id.concat("1");
    const onLoad = () => loadKakaoAPI(newId, lat, lng);

    kakaoMapScript.addEventListener("load", onLoad);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoad);
    };
  }, [_id, lat, lng]);

  return (
    <Card
      className="fixed top-32 right-0 gap-2 left-0 mx-auto max-w-[400px] flex flex-col py-2 px-6"
      onClick={stopBubbling}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex justify-between">
          <CardDescription>{user}</CardDescription>
          <CardDescription>{newDate}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap">{description}</CardContent>
      <div
        id={`${_id}1`}
        className={`size-72 self-center rounded-md ${isAuthor && isEditableDate ? "mb-2" : "mb-10"}`}
      />
      {isAuthor && isEditableDate && (
        <Button
          className="mb-6 mx-auto"
          type="button"
          onClick={handleClick}
          data-cy="editPage"
        >
          수정
        </Button>
      )}
    </Card>
  );
}
