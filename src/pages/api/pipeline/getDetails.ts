import { getPipelineDetails } from '@/lib/services/pipelineService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { pipelineId } = req.query;
    
    try {
        const details = await getPipelineDetails(pipelineId as string);
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
