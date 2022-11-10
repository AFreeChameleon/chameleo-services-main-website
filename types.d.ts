import { PrismaClient } from "@prisma/client";
import { Client } from "pg";
import { Theme } from '@mui/material/styles';

declare global {
    namespace NodeJS {
        interface Global {
            prismaMain: PrismaClient;
            prismaAuth: PrismaClient;
            londonPGClient: Client;
        }
    }
}

declare module '@mui/system' {
  interface DefaultTheme extends Theme {}
}

declare module '*.scss';