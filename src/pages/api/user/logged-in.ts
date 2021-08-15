import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import prisma from '../../../lib/prisma';
import withSession, { NextApiRequestWithSession } from '../../../lib/session';

export default withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            postLoggedIn(req, res)
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
});

const postLoggedIn = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const id = req.session.get('user') || -1;
    const user = await prisma.user.findFirst({
        where: {
            id: id
        }
    });
    if (user) {
        return res.json({
            logged_in: true
        });
    } else {
        return res.status(401).json({
            logged_in: false
        });
    }
}