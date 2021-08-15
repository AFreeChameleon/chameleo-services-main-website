import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import prisma from '../../../lib/prisma';
import withSession, { NextApiRequestWithSession } from '../../../lib/session';
import { salt } from '../../../lib/auth';

export default withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            postLogout(req, res)
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    errors: ['An error occurred while logging you out. Please try again soon.']
                });
            });
            break;
        default:
            console.log('unsupported');
            break;
    }
});

const postLogout = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const id = req.session.get('user');
    if (id) {
        req.session.destroy();
        return res.json({
            message: 'Successfully logged out.'
        })
    } else {
        return res.status(401).json({
            errors: ['User is not logged in.']
        })
    }
}