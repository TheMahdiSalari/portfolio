"use server";

import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { redirect } from "next/navigation";

export interface PostFormState {
  message: string;
  status?: "success" | "error";
}

// تعریف یک اینترفیس برای تایپ‌دهی به ارور دیتابیس
interface DatabaseError {
  code: string;
  message?: string;
}

export async function createPost(prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  // دریافت لینک عکس
  const imageUrl = formData.get("imageUrl") as string;
  const tags = formData.get("tags") as string;
  const published = formData.get("published") === "on";

  if (!title || !slug || !content) {
    return { message: "لطفاً فیلدهای اجباری را پر کنید.", status: "error" };
  }

  try {
    await db.insert(posts).values({
      title,
      slug,
      description,
      content,
      // ذخیره لینک در دیتابیس (تبدیل رشته خالی به نال)
      imageUrl: imageUrl && imageUrl.trim() !== "" ? imageUrl : null,
      tags: tags || null,
      published,
    });
  } catch (error: unknown) { // ✅ تغییر مهم: استفاده از unknown به جای any
    
    // بررسی اینکه آیا ارور آبجکت است و خاصیت code دارد یا خیر
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const dbError = error as DatabaseError;
      
      // کد خطای 23505 در Postgres مربوط به Unique Constraint (تکراری بودن) است
      if (dbError.code === '23505') {
         return { message: "این نامک (Slug) قبلاً استفاده شده است. لطفاً یک نامک دیگر انتخاب کنید.", status: "error" };
      }
    }

    console.error("DB Error:", error);
    return { message: "خطایی در ذخیره پست رخ داد.", status: "error" };
  }

  redirect("/dashboard/posts");
}