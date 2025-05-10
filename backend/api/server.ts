import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('✅ Hello from Express + TypeScript + Vercel! V2 Update ');
});

export default app;
