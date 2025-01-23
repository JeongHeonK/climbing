"use client";

import {
  ChangeEvent,
  useActionState,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { ONE_DAY, DEFAULT_LOCATION } from "@/app/constant/constant";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  generateKakaoScript,
  generateMap,
  generateMarker,
} from "@/app/(home)/util";
import { FormError } from "@/app/components/Authentication/type";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  generateGathering,
  editGathering,
  deleteGathering,
} from "../actions/gatheringActions";
import SubmitButton from "./SubmitButton";

export interface MeetingFormProps {
  _id?: string;
  title: string;
  date: Date | undefined;
  lat: string;
  lng: string;
  description: string;
}

export interface UseMeetingArgs extends Omit<MeetingFormProps, "_id"> {}

export default function MeetingForm({
  _id,
  title,
  date,
  lat,
  lng,
  description,
}: MeetingFormProps) {
  const {
    userInput,
    handleDateChange,
    handleInputChange,
    onSubmit,
    handleDelete,
    formState,
  } = useMeeting({ title, date, lat, lng, description }, _id);
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
        <div
          id={_id || "inputMap"}
          className="size-52 rounded-md"
          data-cy="map"
        />
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
          value={
            userInput.date
              ? userInput.date.toDateString()
              : new Date().toDateString()
          }
        />
        {_id && (
          <Input id="id" name="id" className="hidden" defaultValue={_id} />
        )}
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
        {_id ? (
          <span className="flex gap-4">
            <Button>수정</Button>
            <Button className="bg-red-500" type="button" onClick={handleDelete}>
              삭제
            </Button>
          </span>
        ) : (
          <SubmitButton />
        )}
      </form>
    </div>
  );
}

const initialFormError: FormError = {
  state: null,
  message: null,
};

const useMeeting = (initialValue: UseMeetingArgs, id?: string) => {
  const [userInput, setUserInput] = useState(initialValue);

  const formAction = id ? editGathering : generateGathering;

  const [formState, onSubmit] = useActionState(formAction, initialFormError);

  const handleDateChange = (value: Date | undefined) => {
    setUserInput((prev) => ({ ...prev, date: value }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault();
    if (!id) return;
    await deleteGathering(id);
  };

  useEffect(() => {
    const kakaoMapScript = generateKakaoScript();

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const newId = id ?? null;
        const map = generateMap(
          newId || "inputMap",
          id ? Number(initialValue.lat) : DEFAULT_LOCATION.lat,
          id ? Number(initialValue.lng) : DEFAULT_LOCATION.lng,
        );
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
  }, [id, initialValue.lat, initialValue.lng]);

  return {
    userInput,
    handleDateChange,
    handleInputChange,
    onSubmit,
    formState,
    handleDelete,
  };
};
