import { nanoid } from 'nanoid';
import { encrypt } from './auth';
import { prismaMain, prismaAuth }  from './prisma';

export const setupUserAccount = async (email: string) => {
    const user = await prismaMain.user.findFirst({
        where: {
            email: email
        }
    });
    const rawPassword = nanoid(30);
    const updatedUser = await prismaMain.user.update({
        where: {
            email: email
        },
        data: {
            db_password: encrypt(rawPassword, process.env.DB_PASSWORD_SECRET_KEY),
            db_schema: `schema_${user.uuid.replace(/-/g, '_')}`,
            db_username: `user_${user.uuid.replace(/-/g, '_')}`,
            verified: true
        }
    });
    await createUserAndSchema(updatedUser.db_username, rawPassword, updatedUser.db_schema);
}

const createUserAndSchema = async (username: string, password: string, schema: string) => {
    await prismaAuth.$queryRaw(`CREATE ROLE ${username} WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION PASSWORD '${password}';`);
    await prismaAuth.$queryRaw(`CREATE SCHEMA ${schema} AUTHORIZATION ${username};`);
    return;
}