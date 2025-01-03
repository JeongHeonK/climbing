"use server";

import { z } from "zod";
import { REG, ERROR_MESSAGES } from "@/app/constant/constant";
import { Message } from "@/app/util";

const loginUser = z.object({
  email: z.string().email(new Message(ERROR_MESSAGES.email)),
  password: z
    .string()
    .regex(REG, new Message(ERROR_MESSAGES.reg))
    .min(8, new Message(ERROR_MESSAGES.min))
    .max(12, new Message(ERROR_MESSAGES.max)),
});

export const login = async (
  _: { message: string } | undefined,
  formdata: FormData,
) => {
  const input = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };

  const result = loginUser.safeParse(input);

  if (!result.success) {
    const [{ message }] = result.error.errors;

    return { result, message };
  }

  return { result: "성공", message: "" };
};
