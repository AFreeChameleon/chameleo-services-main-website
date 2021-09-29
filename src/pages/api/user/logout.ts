import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import { prismaMain }  from '../../../lib/prisma';
import withSession, { NextApiRequestWithSession } from '../../../lib/session';
import { salt } from '../../../lib/auth';
import { isUserLoggedIn } from '../../../middleware/auth';

export default withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            isUserLoggedIn(req, res, postLogout);
            break;
        default:
            console.log('unsupported');
            break;
    }
});

const postLogout = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
        req.session.destroy();
        return res.json({
            message: 'Successfully logged out.'
        })
    } catch (err) {
        return res.status(500).json({
            errors: ['An error occurred while logging you out. Please try again soon.']
        });
    }
}