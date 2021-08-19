import { PrismaClient } from '@prisma/client';

// export const prismaMain = new PrismaClient({ datasources: { db: { url: process.env.MAIN_DATABASE_URL }}});
// export const prismaAuth = new PrismaClient({ datasources: { db: { url: process.env.AUTH_DATABASE_URL }}});

export let prismaMain: PrismaClient;
export let prismaAuth: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prismaMain = new PrismaClient({ datasources: { db: { url: process.env.MAIN_DATABASE_URL }}});
    prismaAuth = new PrismaClient({ datasources: { db: { url: process.env.AUTH_DATABASE_URL }}}); 
} else {
  if (!global.prismaMain || !global.prismaAuth) {
    global.prismaMain = new PrismaClient({ datasources: { db: { url: process.env.MAIN_DATABASE_URL }}});
    global.prismaAuth = new PrismaClient({ datasources: { db: { url: process.env.AUTH_DATABASE_URL }}}); 
  }
  prismaMain = global.prismaMain;
  prismaAuth = global.prismaAuth;
}