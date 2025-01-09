"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "@/app/util";
import { GATHERING_ERROR_MESSAGE, ONE_DAY } from "@/app/constant/constant";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  generateKakaoScript,
  generateMap,
  generateMarker,
} from "@/app/(home)/util";
import { useEffect, useState } from "react";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, new Message(GATHERING_ERROR_MESSAGE.titleMin))
    .max(10, new Message(GATHERING_ERROR_MESSAGE.titleMax)),
  description: z
    .string()
    .trim()
    .min(5, new Message(GATHERING_ERROR_MESSAGE.descriptionMin))
    .max(100, new Message(GATHERING_ERROR_MESSAGE.descriptionMax)),
  lat: z.number(new Message(GATHERING_ERROR_MESSAGE.location)),
  lng: z.number(new Message(GATHERING_ERROR_MESSAGE.location)),
  date: z.date(new Message(GATHERING_ERROR_MESSAGE.date)),
});

export default function NewMeetingForm() {
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  console.log(location);
  console.log(date, formSchema);

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

          setLocation((prev) => ({
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
          selected={date}
          onSelect={setDate}
          className="rounded-md"
          disabled={(elem) => elem < new Date(new Date().getTime() - ONE_DAY)}
        />

        <Input name="title" placeholder="모임 이름을 입력하세요" />
        <Textarea
          name="description"
          rows={4}
          placeholder="모임 설명을 입력하세요."
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
