import { NextApiRequest, NextApiResponse } from 'next';
import { prismaMain }  from '../../../lib/prisma';
import withSession, { NextApiRequestWithSession } from '../../../lib/session';
import { isUserLoggedIn } from '../../../middleware/auth';

export default withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            isUserLoggedIn(
                req,
                res,
                getAllContainers
            );
            break;
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
});

const getAllContainers = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
        const containers = await prismaMain.container.findMany({
            where: {
                user_id: req.user.id
            }
        });
        return res.json({
            containers: containers
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            errors: ['An error occurred while getting all of your containers.']
        })
    }
}