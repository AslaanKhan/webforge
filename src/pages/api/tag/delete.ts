import { deleteTag } from '@/lib/services/tagService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { tagId } = req.body;
    
    try {
        const response = await deleteTag(tagId);
        res.status(200).json({ message: 'Tag deleted successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
