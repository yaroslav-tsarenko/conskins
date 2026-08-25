import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// pg-connection-string v3 / pg v9 will drop the legacy aliasing of these
// sslmode values to verify-full. Pin the current behavior explicitly so the
// deprecation warning stops firing without changing how we connect.
const connectionString = (
  process.env.DIRECT_URL ||
  "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"
).replace(/([?&]sslmode=)(prefer|require|verify-ca)\b/i, "$1verify-full");

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
