// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: logs all queries to the console
  });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;