import 'dotenv/config';
import { db } from './lib/db';
import { users } from './db/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function main() {
  const email = "admin@example.com";
  const password = "password123";
  
  console.log("⏳ Deleting existing admin...");
  // اول یوزر قبلی رو پاک می‌کنیم
  await db.delete(users).where(eq(users.email, email));

  console.log("⏳ Creating new admin with fresh password...");
  const hashedPassword = await hash(password, 10);

  // دوباره می‌سازیم
  await db.insert(users).values({
    email,
    password: hashedPassword,
  });

  console.log("✅ Admin reset successfully!");
  console.log("📧 Email:", email);
  console.log("🔑 Password:", password);
}

main().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});