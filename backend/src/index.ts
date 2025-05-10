import dotenv from 'dotenv';
dotenv.config(); // ← load local .env first

import express from 'express';
import { connectToDatabase } from './config/db';

const app = express();
app.use(express.json());

// kick off DB connection (in dev and prod)
connectToDatabase().catch((err) =>
  console.error('❌ MongoDB connection error:', err)
);

// your single health‐check endpoint
app.get('/', (_req, res) => {
  res.send('✅ API is live and connected to MongoDB');
});

// only call listen() when you run locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Local server running at http://localhost:${PORT}`)
  );
}

export default app; // ← this is what Vercel imports
