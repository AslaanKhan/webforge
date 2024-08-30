import { getFunnels } from '@/lib/services/funnelService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const funnels = await getFunnels();
        res.status(200).json(funnels);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
