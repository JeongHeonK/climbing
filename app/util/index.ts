import { MouseEvent } from "react";
import { ONE_DAY } from "../constant/constant";

export class Message {
  constructor(public message: string) {}
}

export const isOverADay = (date: string) => {
  const sessionLeft = new Date(date);
  const today = new Date();
  return Number(sessionLeft) - Number(today) > ONE_DAY;
};

export const stopBubbling = (e: MouseEvent) => e.stopPropagation();
