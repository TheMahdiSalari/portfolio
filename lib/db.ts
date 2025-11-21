import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/db/schema';

// اتصال از طریق HTTP (بدون نیاز به هیچ فایل باینری روی مک)
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });