import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { prismaMain } from '../../../../lib/prisma';
import { setupUserAccount } from "../../../../lib/set_up_user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            postVerifyUserEmail(req, res)
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    errors: ['An error occurred while verifying your email. Please try again soon.']
                });
            });
            break;
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
}

const postVerifyUserEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.query.token as string;
    if (!token) {
        return res.status(400).json({
            message: 'Token was not supplied.'
        })
    }
    const user = await prismaMain.user.findFirst({
        select: {
            tokens: {
                where: {
                    token: token,
                }
            },
            email: true,
            verified: true,
            id: true
        }
    });
    if (!user.verified) {
        if (user.email && user.tokens.length > 0) {
            const expiration = new Date(user.tokens[0].createdAt.getTime() + 30*60000);
            await prismaMain.token.deleteMany({
                where: {
                    user_id: user.id,
                    purpose: 'verify-email'
                }
            });
            if (new Date() < expiration) {
                await setupUserAccount(user.email);
                return res.json({
                    message: 'Email was successfully verified.'
                });
            } else {
                return res.status(400).json({
                    errors: ['Token has expired. Please try again.']
                });
            }
        } else {
            return res.status(400).json({
                errors: ['Invalid token.']
            });
        }
    } else {
        return res.status(500).json({
            errors: ['User is already verified']
        })
    }
}