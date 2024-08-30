import { getTags } from '@/lib/services/tagService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const tags = await getTags();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
