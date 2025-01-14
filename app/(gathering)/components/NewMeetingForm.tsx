"use client";

import { Input } from "@/components/ui/input";
import { ONE_DAY } from "@/app/constant/constant";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  generateKakaoScript,
  generateMap,
  generateMarker,
} from "@/app/(home)/util";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { FormError } from "@/app/components/Authentication/type";
import { useToast } from "@/hooks/use-toast";
import { generateGathering } from "../actions/generateNewGathering";
import SubmitButton from "./SubmitButton";

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
  const {
    userInput,
    handleDateChange,
    handleInputChange,
    onSubmit,
    formState,
  } = useMeeting();
  const { toast } = useToast();

  useEffect(() => {
    if (formState.message !== null) {
      toast({
        description: formState.message,
      });
    }
  }, [formState.message, toast]);

  return (
    <div className="px-2">
      <form
        action={onSubmit}
        className="max-w-[400px] mx-auto flex-col flex  gap-2 items-center bg-white px-5 py-5 -mt-3 rounded-md"
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
        <SubmitButton />
      </form>
    </div>
  );
}

const initialFormError: FormError = {
  state: null,
  message: null,
};
const useMeeting = () => {
  const [userInput, setUserInput] = useState(initialValue);
  const [formState, onSubmit] = useActionState(
    generateGathering,
    initialFormError,
  );

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

  return {
    userInput,
    handleDateChange,
    handleInputChange,
    onSubmit,
    formState,
  };
};
