"use server";

import { checkLoginValidation } from "@/app/util/validation";
import { userDB } from "@/app/api/database";
import { ERROR_MESSAGES } from "@/app/constant/constant";
import bcrypt from "bcryptjs";
import { FormError } from "../type";

export const login = async (
  _: FormError | undefined,
  formdata: FormData,
): Promise<FormError> => {
  const input = {
    email: formdata.get("email")?.toString(),
    password: formdata.get("password")?.toString(),
  };

  const result = checkLoginValidation(input);

  if (!result.success) {
    const [{ message }] = result.error.errors;

    return { state: "error", message };
  }

  if (input.email !== undefined && input.password !== undefined) {
    const user = await userDB.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) return { state: "error", message: ERROR_MESSAGES.user };

    if (!(await checkPassword(input.password, user.password))) {
      return { state: "error", message: ERROR_MESSAGES.pw };
    }
  }

  return { state: "success", message: null };
};

const checkPassword = async (pw: string, hash: string) => {
  return bcrypt.compare(pw, hash);
};
