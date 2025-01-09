"use server";

import { gatheringValidation } from "@/app/util/validation";

export const generateGathering = async (formData: FormData) => {
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

    console.log({ state: "error", message });
  }
};
