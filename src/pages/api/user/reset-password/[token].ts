import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';
import { prismaMain } from '../../../../lib/prisma';
import { salt } from "../../../../lib/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            postVerifyPassword(req, res);
            break;
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
}

const postVerifyPassword = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const tokenString = req.query.token as string;
        const { password, newPassword } = req.body;
        const user = await prismaMain.user.findFirst({
            select: {
                tokens: {
                    where: {
                        token: tokenString,
                        purpose: 'reset-password'
                    }
                },
                password: true,
                id: true
            }
        })
        if (user && user.tokens.length > 0) {
            const token = user.tokens[0];
            const expiration = new Date(token.createdAt.getTime() + 30*60000);
            if (new Date() < expiration) {
                if (bcrypt.compareSync(password, user.password)) {
                    await prismaMain.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            password: await bcrypt.hash(newPassword, salt)
                        }
                    })
                    await prismaMain.token.delete({
                        where: {
                            id: token.id
                        }
                    });
                    return res.json({
                        message: 'Successfully authenticated reset password token.'
                    });
                }
            } else {
                return res.status(401).json({
                    errors: ['Token expired.']
                });
            }
        } else {
            return res.status(404).json({
                errors: ['Password reset token not found.']
            });
        }
    } catch (err) {
        return res.status(500).json({
            errors: ['An error occurred while verifying your token.']
        })
    }
}