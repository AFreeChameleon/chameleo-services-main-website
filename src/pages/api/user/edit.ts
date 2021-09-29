import { NextApiRequest, NextApiResponse } from 'next';
import { omit, pick } from 'lodash';
import bcrypt from 'bcrypt';
import * as yup from 'yup';
import { prismaMain }  from '../../../lib/prisma';
import withSession, { NextApiRequestWithSession } from '../../../lib/session';
import { isUserLoggedIn } from '../../../middleware/auth';

const schema = yup.object().shape({
    email: yup.string()
        .notRequired()
        .min(3, 'Email must have more than 3 characters.')
        .email('Email is invalid.'),
    password: yup.string()
        .notRequired()
        .min(8, 'Password must be 8 or more characters.')
        .matches(
            /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)/, 
            'Password invalid, must contain at least: one uppercase letter, one lowercase letter, one number, one symbol'
        ),
    username: yup.string()
        .notRequired()
        .min(3, 'Username must in between 3 and 50 characters.')
        .max(50, 'Username must in between 3 and 50 characters.'),
}).noUnknown(true);

export default withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            isUserLoggedIn(
                req, 
                res, 
                postEditUser
            );
            break;
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
});

const postEditUser = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
        const validBody = await schema.validate(req.body, { stripUnknown: true, strict: false });
        if (bcrypt.compareSync(validBody.password, req.user.password)) {
            const updatedUser = await prismaMain.user.update({
                where: {
                    id: req.user.id
                },
                data: omit(validBody, ['password'])
            });
            return res.json({
                message: 'Successfully changed user.'
            });
        } else {
            return res.status(401).json({
                errors: ['Password incorrect.']
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            errors: ['An error occurred while editing your user.']
        });
    }
}