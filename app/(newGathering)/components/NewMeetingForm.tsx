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
import { generateGathering } from "../actions/handleSubmit";

export type InitialValue = {
  title: string;
  description: string;
  lat: string;
  lng: string;
  date: Date | undefined;
};

const initialValue: InitialValue = {
  title: "",
  description: "",
  lat: "",
  lng: "",
  date: new Date(),
};

export default function NewMeetingForm() {
  const { userInput, handleDateChange, handleInputChange } = useMeeting();

  return (
    <div className="px-2">
      <form
        action={generateGathering}
        className="max-w-[400px] mx-auto flex-col flex  gap-2 items-center"
      >
        <div id="inputMap" className="size-52 rounded-md" />
        <Calendar
          mode="single"
          selected={userInput.date}
          onSelect={handleDateChange}
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
          onChange={handleInputChange}
        />
        <Input
          id="lng"
          name="lng"
          value={userInput.lng}
          className="hidden"
          onChange={handleInputChange}
        />
        <Input
          id="lat"
          name="lat"
          value={userInput.lat}
          className="hidden"
          onChange={handleInputChange}
        />
        <Input
          id="date"
          name="date"
          className="hidden"
          onChange={handleInputChange}
          value={userInput.date?.toDateString() ?? new Date().toDateString()}
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
          onChange={handleInputChange}
        />
        <Button type="submit" className="mt-3">
          모임 만들기
        </Button>
      </form>
    </div>
  );
}

const useMeeting = () => {
  const [userInput, setUserInput] = useState(initialValue);

  const handleDateChange = (value: Date | undefined) => {
    setUserInput((prev) => ({ ...prev, date: value }));
  };

  const handleInputChange = (
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

        kakao.maps.event.addListener(
          map,
          "click",
          <
            T extends {
              latLng: { getLat: () => number; getLng: () => number };
            },
          >(
            mouseEvent: T,
          ) => {
            const latlng = mouseEvent.latLng;

            marker.setPosition(latlng);

            setUserInput((prev) => ({
              ...prev,
              lat: latlng.getLat().toString(),
              lng: latlng.getLng().toString(),
            }));
          },
        );
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
    };
  }, []);

  return { userInput, handleDateChange, handleInputChange };
};
