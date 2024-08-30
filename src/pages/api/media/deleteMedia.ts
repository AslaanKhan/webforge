import { deleteMedia } from '@/lib/services/mediaService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { mediaId } = req.body;
    
    try {
        const response = await deleteMedia(mediaId);
        res.status(200).json({ message: 'Media deleted successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
