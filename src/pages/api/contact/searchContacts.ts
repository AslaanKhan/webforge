import { searchContacts } from '@/lib/services/contactService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { query } = req.query;
    
    try {
        const contacts = await searchContacts(query as string);
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
