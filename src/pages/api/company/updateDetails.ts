import { updateCompnayService } from '@/lib/services/agencyService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { agencyId, agency } = req.body;
    
    try {
        const response = await updateCompnayService(agencyId, agency);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
