"use server";

import { ERROR_MESSAGES } from "@/app/constant/constant";
import { userDB } from "@/app/api/database";
import { checkSignupValidation } from "@/app/util/validation";
import bcrypt from "bcryptjs";

export type FormError = {
  message: null | string;
};

export const signup = async (_: FormError | undefined, formdata: FormData) => {
  const input = {
    email: formdata.get("email")?.toString(),
    password: formdata.get("password")?.toString(),
    passwordCheck: formdata.get("passwordCheck")?.toString(),
  };

  const validationResult = checkSignupValidation(input);

  if (!validationResult.success) {
    const [{ message }] = validationResult.error.errors;

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
        password: bcrypt.hashSync(input.password, 10),
      },
    });
  }

  return { message: null };
};
