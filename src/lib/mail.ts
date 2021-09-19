import path from 'path';
import mailgun from 'mailgun-js';
import { readFileSync } from 'fs';
import { prismaMain } from './prisma';

const mailer = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
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
        mailer.messages().send(data, (err, body) => {
            if (err) {
                reject({
                    error: true,
                    message: err
                })
            } else {
                resolve({
                    error: false,
                    message: body
                });
            }
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
        mailer.messages().send(data, (err, body) => {
            if (err) {
                reject({
                    error: true,
                    message: err
                })
            } else {
                resolve({
                    error: false,
                    message: body
                });
            }
        })
    })
}