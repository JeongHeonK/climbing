import { z } from "zod";
import { AUTH_ERROR_MESSAGES, REG } from "../constant/constant";
import { Message } from ".";

const signupUser = z
  .object({
    email: z.string().email(new Message(AUTH_ERROR_MESSAGES.email)),
    password: z
      .string()
      .regex(REG, new Message(AUTH_ERROR_MESSAGES.reg))
      .min(8, new Message(AUTH_ERROR_MESSAGES.min))
      .max(12, new Message(AUTH_ERROR_MESSAGES.max)),
    passwordCheck: z
      .string()
      .regex(REG, new Message(AUTH_ERROR_MESSAGES.mismatch))
      .min(8, new Message(AUTH_ERROR_MESSAGES.mismatch))
      .max(12, new Message(AUTH_ERROR_MESSAGES.mismatch)),
  })
  .superRefine(({ password, passwordCheck }, ctx) => {
    if (password !== passwordCheck) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: AUTH_ERROR_MESSAGES.mismatch,
      });
    }
  });

export const checkSignupValidation = signupUser.safeParse;

const loginUser = z.object({
  email: z.string().email(new Message(AUTH_ERROR_MESSAGES.email)),
  password: z
    .string()
    .regex(REG, new Message(AUTH_ERROR_MESSAGES.reg))
    .min(8, new Message(AUTH_ERROR_MESSAGES.min))
    .max(12, new Message(AUTH_ERROR_MESSAGES.max)),
});

export const checkLoginValidation = loginUser.safeParse;
