import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

export type UserInput = {
  title: string;
  date: Date | undefined;
  lat: string;
  lng: string;
  description: string;
};

interface HiddenInputsProps {
  userInput: UserInput;
  isEditPage: boolean;
  id?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function HiddenInputs({
  id,
  userInput,
  onChange,
  isEditPage,
}: HiddenInputsProps) {
  return (
    <>
      <Input
        id="lng"
        name="lng"
        value={userInput.lng}
        className="hidden"
        onChange={onChange}
      />
      <Input
        id="lat"
        name="lat"
        value={userInput.lat}
        className="hidden"
        onChange={onChange}
      />
      <Input
        id="date"
        name="date"
        className="hidden"
        onChange={onChange}
        value={
          userInput.date
            ? userInput.date.toDateString()
            : new Date().toDateString()
        }
      />
      {isEditPage && (
        <Input id="id" name="id" className="hidden" defaultValue={id} />
      )}
    </>
  );
}
