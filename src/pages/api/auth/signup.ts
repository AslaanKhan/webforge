import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { generateToken } from '@/lib/jwt';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(201).json({ message: 'Method not allowed' });
    }

    const { email, passwordHash: password, role } = req.body;

    if (!email || !password) {
        return res.status(201).json({ message: 'Email and password are required' });
    }

    try {
        const existingUser = await db.user.findUnique({ where: { email: email } });

        if (existingUser) {
            return res.status(201).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        
        const user = await db.user.create({
            data: {
                id: req.body.id,
                avatarUrl: req.body.avatarUrl,
                name: req.body.name,
                email: email,
                passwordHash: passwordHash,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt,
                role: req.body.role,
            },
        })

        const token = generateToken({ id: user.id, email: user.email });
        const cookie = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });
        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({ message: 'User created' });
    } catch (error) {
        res.status(202).json({ message: 'Internal server error' });
    }
}
