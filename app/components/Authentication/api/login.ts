"use server";

import { checkLoginValidation } from "@/app/util/validation";

export const login = async (
  _: { message: string } | undefined,
  formdata: FormData,
) => {
  const input = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };

  const result = checkLoginValidation(input);

  if (!result.success) {
    const [{ message }] = result.error.errors;

    return { result, message };
  }

  return { result: "성공", message: "" };
};
