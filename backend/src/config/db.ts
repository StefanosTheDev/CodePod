import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'pocketpod',
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log('✅ MongoDB connected');
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
