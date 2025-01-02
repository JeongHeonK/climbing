import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}
