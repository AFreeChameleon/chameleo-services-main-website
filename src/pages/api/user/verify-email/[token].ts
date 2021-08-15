import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            postVerifyUserEmail(req, res)
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    errors: ['An error occurred while logging you in. Please try again soon.']
                });
            });
            break;
        default:
            console.log('unsupported');
            break;
    }
}

const postVerifyUserEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({
            message: 'Token was not supplied.'
        })
    }
    const email = jwt.verify(token, process.env.NODEMAILER_TOKEN).toString();
}