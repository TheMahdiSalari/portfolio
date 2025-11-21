import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import 'dotenv/config';

// ✅ اصلاح شد: استفاده از datasources.db.url
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  const email = "admin@example.com"; 
  const password = "password123";

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      password: hashedPassword,
    },
  });

  console.log("✅ Admin user created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });