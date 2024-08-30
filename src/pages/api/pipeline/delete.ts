import { deletePipeline } from '@/lib/services/pipelineService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { pipelineId } = req.body;
    
    try {
        const response = await deletePipeline(pipelineId);
        res.status(200).json({ message: 'Pipeline deleted successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
