import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import { prismaMain }  from '../../../lib/prisma';
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
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
});

const postLoggedIn = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const id = req.session.get('user') || -1;
    console.log('id', id)
    const user = await prismaMain.user.findFirst({
        where: {
            id: id
        }
    });
    if (user) {
        console.log('User is logged in', user)
        return res.json({
            logged_in: true
        });
    } else {
        return res.status(401).json({
            logged_in: false
        });
    }
}