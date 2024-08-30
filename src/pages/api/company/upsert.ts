
import { upsertCompanyService } from '@/lib/services/agencyService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    try {
        const response = await upsertCompanyService(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}