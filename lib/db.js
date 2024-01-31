import { PrismaClient } from "@prisma/client";

export const db = new createPrismaClient();

/** @returns {PrismaClient}*/
function createPrismaClient() {
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient({});
  }
  return globalThis.prismaClient;
}
