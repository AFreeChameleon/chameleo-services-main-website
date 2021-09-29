import { PrismaClient } from "@prisma/client";

declare global {
    namespace NodeJS {
        interface Global {
            prismaMain: PrismaClient;
            prismaAuth: PrismaClient;
        }
    }
}