"use server";

import { AUTH_ERROR_MESSAGES } from "@/app/constant/constant";
import { checkSignupValidation, SignupUser } from "@/app/util/validation";
import { connectDB } from "@/app/api/database";
import { hashPassword } from "@/app/util/bcrypt";
import { FormError } from "../type";

export const signup = async (
  _: FormError | undefined,
  formdata: FormData,
): Promise<FormError> => {
  const input = {
    email: formdata.get("email")?.toString(),
    password: formdata.get("password")?.toString(),
    passwordCheck: formdata.get("passwordCheck")?.toString(),
  };

  const validationResult = checkSignupValidation(input);

  if (!validationResult.success) {
    const [{ message }] = validationResult.error.errors;

    return { state: "error", message };
  }

  if (input.email !== undefined && input.password !== undefined) {
    try {
      const db = (await connectDB).db("climbing");
      const user = await db
        .collection<SignupUser>("member")
        .findOne({ email: input.email });

      if (user)
        return { state: "error", message: AUTH_ERROR_MESSAGES.existingEmail };

      const hash = await hashPassword(input.password);

      await db.collection("member").insertOne({
        email: input.email,
        password: hash,
      });
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  return { state: "success", message: null };
};
