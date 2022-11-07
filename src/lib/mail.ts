import path from 'path';
import Mailgun from 'mailgun.js';
import formData from 'form-data';
import { readFileSync } from 'fs';
import { prismaMain } from './prisma';

const mailgun = new Mailgun(formData);

const mailer = mailgun.client({
    key: process.env.MAILGUN_API_KEY,
    username: process.env.MAILGUN_USERNAME,
    url: process.env.MAILGUN_HOST
});

const verifyEmailHTML = readFileSync(path.join(__dirname, '../../../../../html/verification-email.html'));
const resetPassHTML = readFileSync(path.join(__dirname, '../../../../../html/reset-pass-email.html'))

export const sendVerifyEmail = (userEmail: string, token: string) => {
    return new Promise((resolve, reject) => {
        let newVerifyEmailHTML = verifyEmailHTML.toString()
            .replace('TOKEN_URL', `${process.env.HOST}/verify-email/${token}`);
        const data = {
            from: 'Support Chameleo <info@chamel.io>',
            to: userEmail,
            subject: 'Verify your email!',
            html: newVerifyEmailHTML
        }
        mailer.messages.create(process.env.MAILGUN_DOMAIN, data)
        .then((body) => {
            resolve({
                error: false,
                message: body
            });
        })
        .catch((err) => {
            reject({
                error: true,
                message: err
            })
        })
    })
}

export const sendResetPassEmail = (userEmail: string, token: string) => {
    return new Promise((resolve, reject) => {
        const newResetPassHTML = resetPassHTML.toString()
            .replace('TOKEN_URL', `${process.env.HOST}/forgot-password/${token}`);
        const data = {
            from: 'Support Chameleo <info@chamel.io>',
            to: userEmail,
            subject: 'Reset your password!',
            html: newResetPassHTML
        }
        mailer.messages.create(process.env.MAILGUN_DOMAIN, data)
        .then((body) => {
            resolve({
                error: false,
                message: body
            });
        })
        .catch((err) => {
            reject({
                error: true,
                message: err
            })
        })
    })
}