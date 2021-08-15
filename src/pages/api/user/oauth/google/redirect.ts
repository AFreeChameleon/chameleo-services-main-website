import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { getGoogleAuthURL, getTokens } from '../../../../../lib/oauth/google';
import withSession, { NextApiRequestWithSession } from '../../../../../lib/session';
import prisma from '../../../../../lib/prisma';
import { salt } from '../../../../../lib/db_metadata';

export default withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            getGoogleRedirect(req, res)
            .catch((err) => {
                return res.status(500).json({
                    errors: ['An error occurred while logging you in.']
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

const getGoogleRedirect = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const code = req.query.code as string;
    const { id_token, access_token } = await getTokens({
        code,
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    });

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        }
    )
    .then((axios_res: AxiosResponse) => axios_res.data)
    .catch((error: AxiosError) => {
        console.log(`Failed to fetch user`);
        throw new Error(error.message);
    });
    let user = await prisma.user.findFirst({
        where: {
            email: googleUser.email
        }
    });
    if (!user) {
        user = await prisma.user.create({
            data: {
                email: googleUser.email,
                username: googleUser.name,
                password: await bcrypt.hash(access_token, salt),
                oauth: {
                    type: 'google',
                    id: googleUser.id
                }
            }
        });
    }
    req.session.set('user', user.id);
    await req.session.save();
    return res.redirect(`/dashboard`);
}