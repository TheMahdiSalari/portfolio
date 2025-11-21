// app/login/actions.ts
"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function authenticate(prevState: string | undefined, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1. پیدا کردن کاربر در دیتابیس
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return "ایمیل یا رمز عبور اشتباه است.";

    // 2. بررسی رمز عبور
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return "ایمیل یا رمز عبور اشتباه است.";

    // 3. ساخت توکن و ذخیره در کوکی
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(key);

    cookies().set("session", session, { expires, httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });

  } catch (error) {
      console.error("Login error:", error);
      return "خطایی رخ داده است.";
  }

  // 4. ریدارکت در صورت موفقیت (خارج از بلوک try/catch)
  redirect("/dashboard");
}