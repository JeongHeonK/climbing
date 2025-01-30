"use server";

import { checkLoginValidation, LoginUser } from "@/app/util/validation";
import { AUTH_ERROR_MESSAGES } from "@/app/constant/constant";
import { db } from "@/app/api/database";
import { checkPassword } from "@/app/util/bcrypt";
import { Auth } from "@/app/api/auth";
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

  if (input.email === undefined || input.password === undefined)
    return { state: "error", message: "다시 한번 입력해주세요" };

  try {
    const user = await db
      .collection<LoginUser>("member")
      .findOne({ email: input.email });

    if (!user) return { state: "error", message: AUTH_ERROR_MESSAGES.user };

    if (!(await checkPassword(input.password, user.password))) {
      return { state: "error", message: AUTH_ERROR_MESSAGES.pw };
    }
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }

  await Auth.createSession(input.email);
  return { state: "success", message: null };
};
