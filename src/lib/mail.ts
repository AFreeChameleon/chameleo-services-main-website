import path from 'path';
import mailgun from 'mailgun-js';
import { readFileSync } from 'fs';

const mailer = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

export const sendVerifyEmail = (userEmail: string, token: string) => {
    return new Promise((resolve, reject) => {
        const verifyEmailHTML = readFileSync(path.join(__dirname, '../../templates/verification-email.html'))
            .toString()
            .replace('TOKEN_URL', `${process.env.HOST}/verify-email/${token}`);
        const data = {
            from: 'Support Chameleo <info@chamel.io>',
            to: userEmail,
            subject: 'Verify your email!',
            html: verifyEmailHTML
        }
        console.log(data)
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
        const resetPassHTML = readFileSync(path.join(__dirname, '../../templates/reset-pass-email.html'))
            .toString()
            .replace('TOKEN_URL', `${process.env.HOST}/forgot-password/${token}`);
        const data = {
            from: 'Support Chameleo <info@chamel.io>',
            to: userEmail,
            subject: 'Reset your password!',
            html: resetPassHTML
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