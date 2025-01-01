"use server";

import { z } from "zod";
import { REG, errorMessages } from "@/app/constant/constant";
import { Message } from "@/app/util/util";

const signupUser = z
  .object({
    email: z.string().email(new Message(errorMessages.email)),
    password: z
      .string()
      .regex(REG, new Message(errorMessages.reg))
      .min(8, new Message(errorMessages.min))
      .max(12, new Message(errorMessages.max)),
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

export const signup = async (formdata: FormData) => {
  const input = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };

  const result = signupUser.safeParse(input);

  if (!result.success) {
    const [firstError] = result.error.errors;

    throw new Error(firstError.message);
  }
};
