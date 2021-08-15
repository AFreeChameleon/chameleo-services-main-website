import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';
import { salt } from '../../../lib/db_metadata';
import { sendVerifyEmail } from '../../../lib/mail';

const schema = yup.object().shape({
    username: yup.string()
        .required('Username is required.')
        .min(3, 'Username must in between 3 and 50 characters.')
        .max(50, 'Username must in between 3 and 50 characters.'),
    email: yup.string()
        .required('Email is required.')
        .min(3, 'Email must have more than 3 characters.')
        .email('Email is invalid.'),
    password: yup.string()
        .required('Password is required.')
        .min(8, 'Password must be 8 or more characters.')
        .matches(
            /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)/, 
            'Password invalid, must contain at least: one uppercase letter, one lowercase letter, one number, one symbol'
        )
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            postRegister(req, res)
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    errors: ['An error occurred while setting up your account. Please try again soon.']
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

const postRegister = async (req: NextApiRequest, res: NextApiResponse) => {
    schema.validate(req.body)
    .then(async () => {
        const {
            username,
            email,
            password
        } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (user) {
            return res.status(409).json({
                errors: ['Email already registered.']
            });
        } else {
            let newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: await bcrypt.hash(password, salt),
                }
            });
            const token = jwt.sign(email, process.env.NODEMAILER_TOKEN);
            await sendVerifyEmail(email, token);
            return res.json({
                message: 'Success! You have been sent an email. Click on the link to login'
            });
        }
    })
    .catch((err) => {
        return res.status(500).json({
            errors: err.errors
        });
    });
}