import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRouter from './routes/auth';
import { verifyFirebaseToken } from '../src/middleware/verifyFirebaseToken';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('We In this  ');
});

// 🔐 Auth endpoints
app.use('/auth', authRouter);
app.get('/protected', verifyFirebaseToken, (req, res) => {
  res.json({ message: `Hello ${req.user?.email}, you’re in!` });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Local server running at http://localhost:${PORT}`)
  );
}

export default app;
