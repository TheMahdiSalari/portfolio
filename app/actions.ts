"use server";

// 1. تعریف اینترفیس دقیق برای State
// (این را اکسپورت می‌کنیم شاید در کامپوننت کلاینت هم نیاز شود برای تایپ‌دهی)
export interface ActionState {
  success: boolean;
  message: string;
}

// 2. تابع با تایپ‌دهی دقیق به prevState
export async function sendContactForm(
  prevState: ActionState, // ✅ اینجا any حذف و تایپ دقیق جایگزین شد
  formData: FormData
): Promise<ActionState> {
  
  // شبیه‌سازی تاخیر شبکه
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // اعتبارسنجی ساده
  if (!name || !email || !message) {
    return {
      success: false,
      message: "لطفاً تمام فیلدها را پر کنید.",
    };
  }

  // لاگ کردن دیتا برای تست (در پروداکشن حذف شود یا به سرویس لاگ فرستاده شود)
  console.log("Form Data:", { name, email, message });

  // بازگشت نتیجه موفقیت‌آمیز
  return {
    success: true,
    message: "پیام شما دریافت شد. ممنون از تماس شما!",
  };
}