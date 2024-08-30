import { deleteSubaccount } from '@/lib/queries';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { subAccountId } = req.body;
    
    try {
        const response = await deleteSubaccount(subAccountId);
        res.status(200).json({ message: 'SubAccount deleted successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
