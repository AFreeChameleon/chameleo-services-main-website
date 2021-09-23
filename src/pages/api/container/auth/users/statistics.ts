import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import { prismaMain }  from '../../../../../lib/prisma';
import withSession, { NextApiRequestWithSession } from '../../../../../lib/session';
import { isUserLoggedIn } from '../../../../../middleware/auth';

const schema = yup.object({
    container_id: yup.string().uuid().required("Missing container id")
}).noUnknown(true);

export default withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            isUserLoggedIn(
                req,
                res,
                getUsersStatistics
            );
            break;
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
});

const getUsersStatistics = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
        const { container_id } = schema.validateSync(req.body);
        const container = await prismaMain.container.findFirst({
            where: {
                type: 'auth',
                id: container_id,
                user_id: req.user.id
            }
        });
        if (!container) {
            return res.status(404).json({
                errors: ['Cannot find container with that ID']
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: ['An error occurred while creating your container. Please try again.']
        });
    }
}