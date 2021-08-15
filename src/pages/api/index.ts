import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await prisma.user.findMany();
    return res.send(user);
}