import bcrypt from 'bcrypt';
import crypto from 'crypto';
const encryptAlgorithm = 'aes-256-ctr';

export const salt = bcrypt.genSaltSync(10);

export const encrypt = (text: string, secret: string) => {
    const cipher = crypto.createCipher(encryptAlgorithm, secret);
    let encrypted = cipher.update(text,'utf8','hex');
    encrypted += cipher.final('hex');
    return encrypted;
}