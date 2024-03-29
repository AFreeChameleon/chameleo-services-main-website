import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import { prismaMain }  from '../../../../lib/prisma';
import withSession, { NextApiRequestWithSession } from '../../../../lib/session';
import { isUserLoggedIn } from '../../../../middleware/auth';
import {
    checkConfig
} from '../../../../lib/container/validate';
import { getDBFromLocation } from '../../../../lib/container/locate';

const schema = yup.object({
    config: yup.mixed()
        .required(),
    name: yup.string()
        .required()
        .min(3)
        .max(50),
    tier: yup.string()
        .required(),
    location: yup.string()
        .required()
}).noUnknown(true);

export default withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            isUserLoggedIn(
                req,
                res,
                postCreateContainer
            );
            break;
        default:
            res.status(404).json({
                errors: ['Could not find route specified.']
            });
            break;
    }
});

const postCreateContainer = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
        const { config, name, location, tier } = schema.validateSync(req.body);
        console.log(config, req.body)
        const configValidate = checkConfig(config);
        if (configValidate.error) {
            return res.status(400).json({
                errors: [configValidate.message]
            });
        }
        const existingContainer = await prismaMain.container.findFirst({
            where: {
                type: 'auth',
                user_id: req.user.id,
                name: name
            }
        });
        if (existingContainer) {
            return res.status(409).json({
                errors: ['Container with that name already exists.']
            });
        } else {
            const product = await prismaMain.product.findUnique({
                where: { name: tier }
            });
            const newContainer = await prismaMain.container.create({
                data: {
                    type: 'auth',
                    name: name,
                    config: {
                        ...config,
                        db: {
                            server_url: getDBFromLocation(location)
                        }
                    },
                    product: {
                        connect: {
                            id: product.id
                        }
                    },
                    location: location,
                    user: {
                        connect: {
                            id: req.user.id
                        }
                    }
                },  
            });
            return res.json({
                message: 'New container created!',
                uuid: newContainer.id
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: ['An error occurred while creating your container. Please try again.']
        })
    }
}