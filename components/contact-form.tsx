"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendContactForm } from "@/app/actions"; // ایمپورت اکشن سرور
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

// وضعیت اولیه فرم
const initialState = {
  success: false,
  message: "",
};

// کامپوننت دکمه سابمیت جداگانه برای استفاده از useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full md:w-auto" disabled={pending}>
      {pending ? (
        "در حال ارسال..."
      ) : (
        <>
          ارسال پیام
          <Send className="mr-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  // استفاده از هوک useFormState برای ارتباط با سرور اکشن
  // (در ورژن‌های جدید React ممکن است نامش useActionState باشد اما در Next 14/15/16 فعلی useFormState رایج است)
  const [state, formAction] = useFormState(sendContactForm, initialState);

  return (
    <div className="w-full max-w-md mx-auto md:max-w-full">
      <form action={formAction} className="space-y-6">
        
        {/* نمایش پیام موفقیت یا خطا */}
        {state.message && (
          <div
            className={`p-4 rounded-lg flex items-center gap-2 text-sm ${
              state.success
                ? "bg-green-50 text-green-900 border border-green-200 dark:bg-green-900/20 dark:text-green-100"
                : "bg-red-50 text-red-900 border border-red-200 dark:bg-red-900/20 dark:text-red-100"
            }`}
          >
            {state.success ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {state.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">نام و نام خانوادگی</Label>
            <Input
              id="name"
              name="name"
              placeholder="مثلاً: علی محمدی"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">موضوع</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="در مورد پروژه..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">متن پیام</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="پیام خود را اینجا بنویسید..."
            className="min-h-[150px]"
            required
          />
        </div>

        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}