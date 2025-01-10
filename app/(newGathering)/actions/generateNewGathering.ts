"use server";

import { Auth } from "@/app/api/auth";
import { connectDB } from "@/app/api/database";
import { FormError } from "@/app/components/Authentication/type";
import { gatheringValidation } from "@/app/util/validation";
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
    lat: formData.get("lat"),
    lng: formData.get("lng")?.toString(),
    date: formData.get("date")?.toString(),
  };

  const validationResult = gatheringValidation(userInput);

  if (!validationResult.success) {
    const [{ message }] = validationResult.error.errors;

    return { state: "error", message };
  }

  const userId = await Auth.getUsername(JSON.stringify(session));
  console.log(userId);

  const db = (await connectDB).db("climbing");
  await db.collection("gathering").insertOne({
    user: userId,
    title: userInput.title,
    description: userInput.description,
    lat: userInput.lat,
    lng: userInput.lng,
    date: userInput.date,
  });

  return { state: "success", message: null };
};
