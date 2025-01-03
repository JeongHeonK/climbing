"use server";

import { z } from "zod";
import { REG, ERROR_MESSAGES } from "@/app/constant/constant";
import { Message } from "@/app/util";
import { userDB } from "@/app/api/database";

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
        message: ERROR_MESSAGES.mismatch,
      });
    }
  });

export type FormError = {
  message: null | string;
};

export const signup = async (_: FormError | undefined, formdata: FormData) => {
  const input = {
    email: formdata.get("email")?.toString(),
    password: formdata.get("password")?.toString(),
    passwordCheck: formdata.get("passwordCheck")?.toString(),
  };

  const result = signupUser.safeParse(input);

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
