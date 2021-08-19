import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from 'nanoid';
import { prismaMain } from "../../../../lib/prisma";
import { sendVerifyEmail } from '../../../../lib/mail';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            postResendVerifyUserEmail(req, res)
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    errors: ['An error occurred while resending your verification email. Please try again soon.']
                })
            });
            break;
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
}

const postResendVerifyUserEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    const email = req.body.email;
    const user = await prismaMain.user.findFirst({
        where: {
            email: email
        }
    });
    await prismaMain.token.deleteMany({
        where: {
            user_id: user.id,
            purpose: 'verify-email'
        }
    });

    const newToken = await prismaMain.token.create({
        data: {
            user_id: user.id,
            token: nanoid(32),
            purpose: 'verify-email',
        }
    });

    await sendVerifyEmail(email, newToken.token);
    return res.json({
        message: 'Success! You have been sent an email. Click on the link to login'
    });
}