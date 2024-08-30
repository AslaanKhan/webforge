// pages/api/file-upload/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { verifyToken } from '@/lib/jwt';
import { db } from '@/lib/db';

// Create a storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir); // Set the destination
    },
    filename: (req, file, cb) => {
        // Create a unique filename
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFilename); // Set the filename
    },
});

// Initialize Multer with the defined storage
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Accept only JPG and PNG files
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Invalid file type. Only JPG and PNG files are allowed.'));
        }
        cb(null, true);
    },
});

// Middleware to handle Multer file upload
const uploadMiddleware = upload.single('file');

// API route to handle file uploads
const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.token;
    const user = await verifyToken(token!); 
     uploadMiddleware(req as any, res as any, async (err: any) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        // File is available at req.file
        const fileUrl = `/uploads/${req.file?.filename}`;

        await db.media.create({
            data: {
                url: fileUrl,
                link: fileUrl,
                name: fileUrl,                
            },
        })
        res.status(200).json({ url: fileUrl });
    });
};

export const config = {
    api: {
        bodyParser: false, // Disable body parsing to handle raw data
    },
};

export default uploadHandler;
