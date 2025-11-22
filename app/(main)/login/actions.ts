"use server";

import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

// ✅ Fix: اضافه کردن Fallback برای جلوگیری از ارور "Zero-length key"
const secretKey = process.env.JWT_SECRET || "default-secret-key-dont-use-in-production"; 
const key = new TextEncoder().encode(secretKey);

export async function authenticate(prevState: string | undefined, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // کوئری Postgres: دریافت آرایه
    const usersList = await db.select().from(users).where(eq(users.email, email));
    const user = usersList[0];

    if (!user) return "ایمیل یا رمز عبور اشتباه است.";

    const passwordsMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordsMatch) return "رمز عبور اشتباه است.";

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(key);

    (await cookies()).set("session", session, { expires, httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });

  } catch (error) {
      console.error("❌ LOGIN CRASH:", error); // برای دیباگ نهایی
      return "خطای سیستمی رخ داد.";
  }

  redirect("/dashboard");
}