import { getUserPermissions } from '@/lib/services/userService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId } = req.query;
    
    try {
        const permissions = await getUserPermissions(userId as string);
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
