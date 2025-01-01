"use server";

import { z } from "zod";
import { REG, ERROR_MESSAGES } from "@/app/constant/constant";
import { Message } from "@/app/util/util";

const loginUser = z.object({
  email: z.string().email(new Message(ERROR_MESSAGES.email)),
  password: z
    .string()
    .regex(REG, new Message(ERROR_MESSAGES.reg))
    .min(8, new Message(ERROR_MESSAGES.min))
    .max(12, new Message(ERROR_MESSAGES.max)),
});

export const login = async (formdata: FormData) => {
  const input = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };

  const result = loginUser.safeParse(input);

  if (!result.success) {
    const [firstError] = result.error.errors;

    throw new Error(firstError.message);
  }
};
