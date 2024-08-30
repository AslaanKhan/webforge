import { deleteUser } from '@/lib/services/userService';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId } = req.body;
    
    try {
        const response = await deleteUser(userId);
        res.status(200).json({ message: 'User deleted successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
