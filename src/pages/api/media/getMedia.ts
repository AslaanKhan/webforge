import { getMedia } from '@/lib/services/mediaService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { mediaId } = req.query;
    
    try {
        const media = await getMedia(mediaId as string);
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
