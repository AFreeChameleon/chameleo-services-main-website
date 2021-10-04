import { PrismaClient } from "@prisma/client";
import { Client } from "pg";

declare global {
    namespace NodeJS {
        interface Global {
            prismaMain: PrismaClient;
            prismaAuth: PrismaClient;
            londonPGClient: Client;
        }
    }
}