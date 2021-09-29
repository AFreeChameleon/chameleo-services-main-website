import { NextApiRequest, NextApiResponse } from 'next';
import { getGoogleAuthURL } from '../../../../../lib/oauth/google';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            return res.redirect(getGoogleAuthURL());
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
}