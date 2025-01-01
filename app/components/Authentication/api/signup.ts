"use server";

import { z } from "zod";
import { REG, ERROR_MESSAGES } from "@/app/constant/constant";
import { Message } from "@/app/util/util";

const signupUser = z
  .object({
    email: z.string().email(new Message(ERROR_MESSAGES.email)),
    password: z
      .string()
      .regex(REG, new Message(ERROR_MESSAGES.reg))
      .min(8, new Message(ERROR_MESSAGES.min))
      .max(12, new Message(ERROR_MESSAGES.max)),
    passwordCheck: z.string().regex(REG).min(8).max(12),
  })
  .superRefine(({ password, passwordCheck }, ctx) => {
    if (password !== passwordCheck) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });

export const signup = async (
  _: { message: string } | undefined,
  formdata: FormData,
) => {
  const input = {
    email: formdata.get("email"),
    password: formdata.get("password"),
    passwordCheck: formdata.get("passwordCheck"),
  };

  const result = signupUser.safeParse(input);

  if (!result.success) {
    const [{ message }] = result.error.errors;

    return { result, message };
  }

  return { result: "성공", message: "" };
};
