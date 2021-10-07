import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import { prismaMain }  from '../../../../../../lib/prisma';
import withSession, { NextApiRequestWithSession } from '../../../../../../lib/session';
import { isUserLoggedIn } from '../../../../../../middleware/auth';
import { getConnection } from '../../../../../../lib/db';

const querySchema = yup.object({
    container_id: yup.string().uuid().required("Missing container id")
}).noUnknown(true);

const bodySchema = yup.object({
    user_id: yup.number().required("Missing user id"),
}).noUnknown(true);

export default withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    switch (req.method) {
        case 'PATCH':
            isUserLoggedIn(
                req,
                res,
                deleteDestroyUser
            );
            break;
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
});

const deleteDestroyUser = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
        const { container_id } = querySchema.validateSync(req.query);
        const { user_id } = bodySchema.validateSync(req.body);
        const container = await prismaMain.container.findFirst({
            where: {
                id: container_id,
                user_id: req.user.id
            }
        });
        if (!container) {
            return res.status(404).json({
                errors: ['Cannot find container']
            })
        }
        const client: any = await getConnection(container.location);
        client.query(`
            DELETE FROM ${req.user.db_schema}.users
                WHERE id = $1
        `, [user_id], (err, dbRes) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    errors: ['An error occurred while deleting the user, please try again.']
                });
            }
            return res.json({
                message: 'Success!'
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: ['An error occurred while deleting the user, please try again.']
        });
    }
}