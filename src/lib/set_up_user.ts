import { nanoid } from 'nanoid';
import { encrypt } from './auth';
import prisma from './prisma';

export const setupUserAccount = async (email: string) => {
    // const user = await findOneUser({ email: email });
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (!user?.verified) {
        const rawPassword = nanoid(30);
        const updatedUser = prisma.user.update({
            where: {
                email: email
            },
            data: {
                db_password: encrypt(rawPassword, process.env.DB_PASSWORD_SECRET_KEY),
                db_schema: `schema_${user.uuid}`,
                db_username: `user_${user.uuid}`,
                verified: true
            }
        });
        // TODO: create a set up script
        // await createUserAndSchema(user!.db_username, rawPassword, user!.db_schema);
        return true;
    } else {
        return false;
    }
}