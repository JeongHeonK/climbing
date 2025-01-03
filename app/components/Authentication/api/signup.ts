"use server";

import { ERROR_MESSAGES } from "@/app/constant/constant";
import { userDB } from "@/app/api/database";
import { checkSignupValidation } from "@/app/util/validation";
import bcrypt from "bcryptjs";
import { FormError } from "../type";

export const signup = async (
  _: FormError | undefined,
  formdata: FormData,
): Promise<FormError> => {
  const input = {
    email: formdata.get("email")?.toString(),
    password: formdata.get("password")?.toString(),
    passwordCheck: formdata.get("passwordCheck")?.toString(),
  };

  const validationResult = checkSignupValidation(input);

  if (!validationResult.success) {
    const [{ message }] = validationResult.error.errors;

    return { state: "error", message };
  }

  if (input.email !== undefined && input.password !== undefined) {
    const user = await userDB.findUnique({
      where: {
        email: input.email,
      },
    });

    if (user) return { state: "error", message: ERROR_MESSAGES.existingEmail };

    const hash = await bcrypt.hash(input.password, 10);

    await userDB.create({
      data: {
        email: input.email,
        password: hash,
      },
    });
  }

  return { state: "success", message: null };
};
