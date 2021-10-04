import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import { prismaMain }  from '../../../../../../lib/prisma';
import withSession, { NextApiRequestWithSession } from '../../../../../../lib/session';
import { isUserLoggedIn } from '../../../../../../middleware/auth';
import {
    getAllUsersStatistics
} from '../../../../../../lib/container/user_statistics';

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
        const { container_id } = schema.validateSync(req.query);
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
        getAllUsersStatistics(
            req.user, 
            container, 
        ([
            users, 
            userCountPromise, 
            activeUsers, 
            userStatsPromise, 
            emailSentPromise, 
            emailCountPromise
        ]) => {
            return res.json({
                users: users.rows,
                userCount: parseInt(userCountPromise.rowCount),
                activeUsers: {
                    online: parseInt(activeUsers.rows[0].count),
                    away: parseInt(activeUsers.rows[1].count),
                    offline: parseInt(activeUsers.rows[2].count),
                },
                userStats: userStatsPromise.rows,
                emails: emailSentPromise.rows,
                emailCount: parseInt(emailCountPromise.rows[0].count)
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: ['An error occurred while getting your users\' statistics. Please try again.']
        });
    }
}