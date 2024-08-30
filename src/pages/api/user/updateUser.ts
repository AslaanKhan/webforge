import { updateUserDetails } from '@/lib/services/userService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId, user } = req.body;
    
    try {
        const response = await updateUserDetails(userId, user);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
