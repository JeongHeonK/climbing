"use server";

import { checkLoginValidation } from "@/app/util/validation";
import { ERROR_MESSAGES } from "@/app/constant/constant";
import { connectDB } from "@/app/api/database";
import { checkPassword } from "@/app/util/bcrypt";
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

  const db = (await connectDB).db("climbing");
  const user = await db.collection("member").findOne({ email: input.email });

  if (!user) return { state: "error", message: ERROR_MESSAGES.user };

  if (!(await checkPassword(input.password, user.password))) {
    return { state: "error", message: ERROR_MESSAGES.pw };
  }

  // 쿠키 함수 변경 예정
  return { state: "success", message: null };
};
