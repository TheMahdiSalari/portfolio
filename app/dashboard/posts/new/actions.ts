"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// ۱. تعریف تایپ دقیق برای استیت فرم
export interface PostFormState {
  message: string;
  status?: "success" | "error";
}

// ۲. استفاده از تایپ تعریف شده به جای any
export async function createPost(
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const tags = formData.get("tags") as string;
  const published = formData.get("published") === "on";

  if (!title || !slug || !content) {
    return { message: "لطفاً فیلدهای اجباری را پر کنید.", status: "error" };
  }

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        description,
        content,
        imageUrl: imageUrl || null,
        tags: tags || null,
        published,
      },
    });
  } catch (error: unknown) { // استفاده از unknown به جای any برای مدیریت ارور
      // چک کردن ارور با Type Guard یا چک کردن کد به صورت ایمن
      if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
          return { message: "این نامک (Slug) قبلاً استفاده شده است.", status: "error" };
      }
      return { message: "خطایی در ذخیره پست رخ داد.", status: "error" };
  }

  redirect("/dashboard/posts");
}