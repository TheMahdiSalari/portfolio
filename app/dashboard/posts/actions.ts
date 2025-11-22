"use server";

import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string) {
  try {
    await db.delete(posts).where(eq(posts.id, postId));
    
    // این خط خیلی مهمه: باعث میشه صفحه بلافاصله رفرش شه و تغییر رو ببینی
    revalidatePath("/dashboard/posts");
    revalidatePath("/projects"); // صفحه عمومی هم آپدیت شه
    return { success: true, message: "پست با موفقیت حذف شد" };
  } catch (error) {
    return { success: false, message: "خطا در حذف پست" };
  }
}