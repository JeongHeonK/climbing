"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ONE_DAY } from "@/app/constant/constant";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  generateKakaoScript,
  generateMap,
  generateMarker,
} from "@/app/(home)/util";
import { ChangeEvent, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";

const initialValue: {
  title: string;
  description: string;
  lat: number;
  lng: number;
  date: Date | undefined;
} = {
  title: "",
  description: "",
  lat: 0,
  lng: 0,
  date: new Date(),
};

export default function NewMeetingForm() {
  const [userInput, setUserInput] = useState(initialValue);
  console.log(userInput);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const kakaoMapScript = generateKakaoScript();

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const map = generateMap("inputMap");
        const marker = generateMarker(map);

        marker.setMap(map);

        kakao.maps.event.addListener(map, "click", function <
          T extends { latLng: { getLat: () => number; getLng: () => number } },
        >(mouseEvent: T) {
          const latlng = mouseEvent.latLng;

          marker.setPosition(latlng);

          setUserInput((prev) => ({
            ...prev,
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          }));
        });
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, []);

  return (
    <div className="px-2">
      <form
        onSubmit={() => {}}
        className="max-w-[400px] mx-auto flex-col flex gap-2 items-center"
      >
        <div id="inputMap" className="size-52 rounded-md" />
        <Calendar
          mode="single"
          selected={userInput.date}
          onSelect={(value) =>
            setUserInput((prev) => ({ ...prev, date: value }))
          }
          className="rounded-md"
          disabled={(elem) => elem < new Date(new Date().getTime() - ONE_DAY)}
        />
        <Label htmlFor="title" className="self-start">
          제목
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="모임 이름을 입력하세요"
          value={userInput.title}
          onChange={handleChange}
        />
        <Label htmlFor="description" className="self-start">
          내용
        </Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          placeholder="모임 설명을 입력하세요."
          value={userInput.description}
          onChange={handleChange}
        />
        <Button type="submit" className="mt-3">
          모임 만들기
        </Button>
      </form>
    </div>
  );
}
