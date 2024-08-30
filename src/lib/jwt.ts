// lib/jwt.ts

import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';


const JWT_SECRET = 'Arsalaan'; // Store secret in env variable

export const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

export const verifyToken = async (token: string) => {
  try {
    const encodedKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, encodedKey);
    return payload; // This contains the decoded JWT data
  } catch (error) {
    throw new Error('Invalid token');
  }
};
