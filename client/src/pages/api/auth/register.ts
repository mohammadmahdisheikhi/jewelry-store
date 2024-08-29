import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { openDb } from '@/database/init';
import formidable, { IncomingForm } from 'formidable';
const nextConnect = require('next-connect');


// Disable the default body parser to use formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse form data using formidable
const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields, files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit for files
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = nextConnect()
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    try {
      const { fields, files } = await parseForm(req);
      req.body = fields; // Attach parsed fields to req.body
      req.files = files; // Attach parsed files to req.files (if needed)
      next();
    } catch (err) {
      console.error('Error parsing form:', err);
      res.status(500).json({ message: 'Error parsing form data' });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { firstname, lastname, phonenumber, IDnumber, password } = req.body;

    try {
      const db = await openDb();

      // Check if user already exists
      const existingUser = await db.get('SELECT * FROM users WHERE phonenumber = ?', [phonenumber]);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user to the database
      const result = await db.run(
        'INSERT INTO users (firstname, lastname, phonenumber, IDnumber, password) VALUES (?, ?, ?, ?, ?)',
        [firstname, lastname, phonenumber, IDnumber, hashedPassword]
      );

      const newUserId = result.lastID;

      // Create JWT tokens
      const accessToken = jwt.sign({ userId: newUserId }, process.env.JWT_SECRET!, { expiresIn: '1d' });
      const refreshToken = jwt.sign({ userId: newUserId }, process.env.JWT_SECRET!, { expiresIn: '7d' });

      res.status(201).json({ access: accessToken, refresh: refreshToken });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export default handler;
