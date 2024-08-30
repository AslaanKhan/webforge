import { createTeamUser } from '@/lib/services/userService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { agencyId, user } = req.body;
    
    try {
        const response = await createTeamUser(agencyId, user);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
