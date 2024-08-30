import { deleteCompanyService } from '@/lib/services/agencyService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { agencyId } = req.body;
    
    try {
        const response = await deleteCompanyService(agencyId);
        res.status(200).json({ message: 'Agency deleted successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
