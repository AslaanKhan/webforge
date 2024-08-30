import { deleteTicket } from '@/lib/services/ticketService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { ticketId } = req.body;
    
    try {
        const response = await deleteTicket(ticketId);
        res.status(200).json({ message: 'Ticket deleted successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
