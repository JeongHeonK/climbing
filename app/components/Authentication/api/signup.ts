"use server";

import { ERROR_MESSAGES } from "@/app/constant/constant";
import { userDB } from "@/app/api/database";
import { checkSignupValidation } from "@/app/util/validation";

export type FormError = {
  message: null | string;
};

export const signup = async (_: FormError | undefined, formdata: FormData) => {
  const input = {
    email: formdata.get("email")?.toString(),
    password: formdata.get("password")?.toString(),
    passwordCheck: formdata.get("passwordCheck")?.toString(),
  };

  const result = checkSignupValidation(input);

  if (!result.success) {
    const [{ message }] = result.error.errors;

    return { message };
  }

  if (input.email !== undefined && input.password !== undefined) {
    const user = await userDB.findUnique({
      where: {
        email: input.email,
      },
    });

    if (user) return { message: ERROR_MESSAGES.existingEmail };

    await userDB.create({
      data: {
        email: input.email,
        password: input.password,
      },
    });
  }

  return { message: null };
};
