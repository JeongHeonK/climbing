import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  const email = "test12@test.com";
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email,
        password: "112233!!t",
      },
    });
    return "성공";
  }
  return "중복된 아이디 입니다.";
}
