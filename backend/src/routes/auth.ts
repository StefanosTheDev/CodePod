import { Router, Request, Response } from 'express';
import admin from '../utils/firebaseAdmin';

const router = Router();

/**
 * POST /auth/verify
 * { idToken: string }
 *
 * Verifies a Firebase ID token and returns basic user info.
 */
router.post('/verify', async (req: Request, res: Response) => {
  const { idToken } = req.body as { idToken?: string };
  if (!idToken) {
    return res.status(400).json({ error: 'No ID token provided' });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    return res.json({
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name ?? null,
    });
  } catch (err) {
    console.error('Token verification failed', err);
    return res.status(401).json({ error: 'Invalid or expired ID token' });
  }
});

export default router;
