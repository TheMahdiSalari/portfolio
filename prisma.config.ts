import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // ✅ تغییر: اضافه کردن ?? "" برای رفع ارور تایپ
    url: process.env.DATABASE_URL ?? "",
  },
});