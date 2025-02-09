"use client";

import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { ONE_DAY, DEFAULT_LOCATION } from "@/app/constant/constant";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { generateKakaoScript, loadKakaoAPIWithForm } from "@/app/(home)/util";
import { FormError } from "@/app/components/Authentication/type";
import { useToast } from "@/hooks/use-toast";
import { generateGathering, editGathering } from "../actions/gatheringActions";
import SubmitButton from "./SubmitButton";
import ButtonGroup from "./ButtonGroup";
import HiddenInputs from "./HiddenInputs";

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
  const isEditPage = _id !== undefined;

  const { userInput, handleDateChange, handleInputChange } = useMeetingContext(
    { title, date, lat, lng, description },
    _id,
  );
  const { formState, onSubmit } = useMeetingFrom(isEditPage);
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
        <HiddenInputs
          id={_id}
          userInput={userInput}
          onChange={handleInputChange}
          isEditPage={isEditPage}
        />

        {isEditPage ? <ButtonGroup id={_id} /> : <SubmitButton />}
      </form>
    </div>
  );
}

const initialFormError: Omit<FormError, "input"> = {
  state: null,
  message: null,
};

const useMeetingContext = (initialValue: UseMeetingArgs, id?: string) => {
  const [userInput, setUserInput] = useState(initialValue);
  const isEditPage = id !== undefined;

  const handleDateChange = (value: Date | undefined) => {
    setUserInput((prev) => ({ ...prev, date: value }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (lat: string, lng: string) => {
    setUserInput((prev) => ({
      ...prev,
      lat,
      lng,
    }));
  };

  useEffect(() => {
    const kakaoMapScript = generateKakaoScript();

    const newId = id ?? "inputMap";
    const newLat = isEditPage ? Number(initialValue.lat) : DEFAULT_LOCATION.lat;
    const newLng = isEditPage ? Number(initialValue.lng) : DEFAULT_LOCATION.lng;

    const onLoad = () =>
      loadKakaoAPIWithForm(newId, newLat, newLng, handleLocationChange);

    kakaoMapScript.addEventListener("load", onLoad);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoad);
    };
  }, [isEditPage, initialValue.lat, initialValue.lng, id]);

  return {
    userInput,
    handleDateChange,
    handleInputChange,
  };
};

const useMeetingFrom = (isEditPage: boolean) => {
  const formAction = isEditPage ? editGathering : generateGathering;

  const [formState, onSubmit] = useActionState(formAction, initialFormError);

  return { formState, onSubmit };
};
