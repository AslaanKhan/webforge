import { getSubaccountDetails } from '@/lib/queries';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { subAccountId } = req.query;
    
    try {
        const details = await getSubaccountDetails(subAccountId as string);
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
