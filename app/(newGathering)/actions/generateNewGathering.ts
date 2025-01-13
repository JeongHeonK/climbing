"use server";

import { Auth } from "@/app/api/auth";
import { connectDB } from "@/app/api/database";
import { FormError } from "@/app/components/Authentication/type";
import { gatheringValidation, Gathering } from "@/app/util/validation";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const generateGathering = async (
  _: FormError | undefined,
  formData: FormData,
): Promise<FormError> => {
  const session = (await cookies()).get("session")?.value;

  if (!session) return { state: "error", message: "로그인 후 이용해주세요." };

  const userInput = {
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    lat: formData.get("lat")?.toString(),
    lng: formData.get("lng")?.toString(),
    date: formData.get("date")?.toString(),
  };

  const validationResult = gatheringValidation(userInput);

  if (!validationResult.success) {
    const [{ message }] = validationResult.error.errors;

    return { state: "error", message };
  }

  const userId = await Auth.getUsername(JSON.stringify(session));

  if (
    userInput.title === undefined ||
    userInput.description === undefined ||
    userInput.lat === undefined ||
    userInput.lng === undefined ||
    userInput.date === undefined
  )
    return { state: "error", message: "빈 값을 입력할 수 없습니다" };

  const db = (await connectDB).db("climbing");
  await db.collection<Gathering>("gathering").insertOne({
    user: userId,
    title: userInput.title,
    description: userInput.description,
    lat: userInput.lat,
    lng: userInput.lng,
    date: new Date(userInput.date),
  });
  redirect("/");
  return { state: "success", message: null };
};
