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
    edit: yup.object().required("Missing edit columns")
}).noUnknown(true);

export default withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    switch (req.method) {
        case 'PATCH':
            isUserLoggedIn(
                req,
                res,
                patchEditUser
            );
            break;
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
});

const patchEditUser = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
        const { container_id } = querySchema.validateSync(req.query);
        const { user_id, edit } = bodySchema.validateSync(req.body);
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
        const userColumnNames = (container.config as any).model.map((r) => r.name);
        const client: any = await getConnection(container.location);
        const keys = Object.keys(edit).filter(k => userColumnNames.includes(k));
        const values = keys.map(k => edit[k]);
        const updateStrings = keys.map((k, i) => `"${k}" = $${i + 1}`);
        console.log(`
            UPDATE ${req.user.db_schema}.users
                SET
                    ${updateStrings.join(', ')}
                WHERE
                    id = $${keys.length + 1};`, keys, values
        );
        client.query(`
            UPDATE ${req.user.db_schema}.users
                SET
                    ${updateStrings.join(', ')}
                WHERE
                    id = $${keys.length + 1};
        `, [ ...values, user_id ], (err, dbRes) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    errors: ['An error occurred while editing the user, please try again.']
                });
            }
            return res.json({
                message: 'Success!'
            })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: ['An error occurred while editing the user, please try again.']
        });
    }
}