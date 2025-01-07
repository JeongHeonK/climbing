import bcrypt from "bcryptjs";

export const checkPassword = async (pw: string, hash: string) => {
  return bcrypt.compare(pw, hash);
};

export const hashPassword = async (pw: string) => {
  const hash = await bcrypt.hash(pw, 10);

  return hash;
};
