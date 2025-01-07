"use server";

import { Auth } from "@/app/api/auth";

export const logout = async () => {
  await Auth.logout();
};
