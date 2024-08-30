import { getSubAccountTeamMembers } from '@/lib/services/subAccountService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { subAccountId } = req.query;
    
    try {
        const teamMembers = await getSubAccountTeamMembers(subAccountId as string);
        res.status(200).json(teamMembers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
