import { NextApiRequest, NextApiResponse } from "next";
import { prismaMain } from '../../../../lib/prisma';
import { sendResetPassEmail } from "../../../../lib/mail";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            postResetPassword(req, res);
            break;
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
}

const postResetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email } = req.body;
        const user = await prismaMain.user.findFirst({
            where: {
                email: email
            },
        });
        if (user) {
            await prismaMain.token.deleteMany({
                where: {
                    purpose: 'reset-password',
                    user_id: user.id
                }
            });
            console.log(user)
            const token = await prismaMain.token.create({
                data: {
                    purpose: 'reset-password',
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            });
            console.log(token)
            await sendResetPassEmail(email, token.token);
            return res.json({
                message: 'Success! We\'ve sent you an email containing instructions on how to reset your password.'
            });
        } else {
            return res.status(404).json({
                errors: ['Email is not registered.']
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: ['An error occurred while resetting your password. Please try again soon.']
        });
    }
}