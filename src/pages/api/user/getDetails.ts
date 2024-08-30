import { verifyToken } from '@/lib/jwt';
import { getAuthUserDetails } from '@/lib/services/userService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        const token = req.cookies.token
        const user =  await verifyToken(token!); 
        const userDetails = await getAuthUserDetails( user?.userId );
        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
