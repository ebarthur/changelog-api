import { PrismaClient } from '@prisma/client';

// TODO: Change DATABASE_URL to supabase. Render database expires soon

const prisma = new PrismaClient();

export default prisma;
