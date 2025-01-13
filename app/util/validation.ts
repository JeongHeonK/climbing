import { z } from "zod";
import {
  AUTH_ERROR_MESSAGES,
  GATHERING_ERROR_MESSAGE,
  REG,
} from "../constant/constant";
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
type Signup = z.infer<typeof signupUser>;
export type SignupUser = Omit<Signup, "passwordCheck">;

const loginUser = z.object({
  email: z.string().email(new Message(AUTH_ERROR_MESSAGES.email)),
  password: z
    .string()
    .regex(REG, new Message(AUTH_ERROR_MESSAGES.reg))
    .min(8, new Message(AUTH_ERROR_MESSAGES.min))
    .max(12, new Message(AUTH_ERROR_MESSAGES.max)),
});

export const checkLoginValidation = loginUser.safeParse;
export type LoginUser = z.infer<typeof loginUser>;

const gathering = z.object({
  title: z
    .string()
    .trim()
    .min(3, new Message(GATHERING_ERROR_MESSAGE.titleMin))
    .max(20, new Message(GATHERING_ERROR_MESSAGE.titleMax)),
  description: z
    .string()
    .trim()
    .min(5, new Message(GATHERING_ERROR_MESSAGE.descriptionMin))
    .max(100, new Message(GATHERING_ERROR_MESSAGE.descriptionMax)),
  lat: z.string().trim().min(1, new Message(GATHERING_ERROR_MESSAGE.location)),
  lng: z.string().trim().min(1, new Message(GATHERING_ERROR_MESSAGE.location)),
});

export const gatheringValidation = gathering.safeParse;

export type Gathering = z.infer<typeof gathering> & {
  user: string;
  date: Date;
};
