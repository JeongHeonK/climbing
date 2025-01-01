"use server";

import { z } from "zod";
import { REG, errorMessages } from "@/app/constant/constant";
import { Message } from "@/app/util/util";

const loginUser = z.object({
  email: z.string().email(new Message(errorMessages.email)),
  password: z
    .string()
    .regex(REG, new Message(errorMessages.reg))
    .min(8, new Message(errorMessages.min))
    .max(12, new Message(errorMessages.max)),
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
