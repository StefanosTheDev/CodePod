import { Request, Response, NextFunction } from 'express';
import admin from '../utils/firebaseAdmin';

// Extend Express.Request so TS knows `req.user` exists
declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}

export async function verifyFirebaseToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const idToken = header.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Unauthorized' });
  }
}
