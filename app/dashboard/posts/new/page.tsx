"use client";

// ✅ تغییر ۱: ایمپورت useActionState از 'react'
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createPost, type PostFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

// وضعیت اولیه برای فرم
const initialState: PostFormState = {
  message: "",
  status: undefined,
};

function SubmitButton() {
  // useFormStatus همچنان از react-dom می‌آید و برای دکمه داخل فرم استفاده می‌شود
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto md:min-w-[150px]">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="mr-2 h-4 w-4"/> ذخیره پست</>}
    </Button>
  );
}

export default function NewPostPage() {
  // ✅ تغییر ۲: استفاده از useActionState به جای useFormState
  const [state, dispatch] = useActionState(createPost, initialState);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">افزودن پست/پروژه جدید</h1>
      </div>
      
      {/* اتصال فرم به دیسپچ اکشن */}
      <form action={dispatch}>
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          
          {/* ستون اصلی (چپ) */}
          <Card>
            <CardHeader>
              <CardTitle>محتوای اصلی</CardTitle>
              <CardDescription>اطلاعات اصلی پست را وارد کنید.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان (اجباری)</Label>
                <Input id="title" name="title" placeholder="مثلاً: پروژه طراحی سایت فروشگاهی" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">نامک / Slug (اجباری - یکتا)</Label>
                <Input id="slug" name="slug" placeholder="my-project-slug" required className="font-mono text-sm" />
                <p className="text-xs text-muted-foreground">این قسمت در آدرس URL استفاده می‌شود.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">توضیحات کوتاه</Label>
                <Textarea id="description" name="description" placeholder="خلاصه‌ای برای نمایش در کارت‌ها..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">محتوای کامل (اجباری)</Label>
                <Textarea id="content" name="content" placeholder="متن کامل پست یا توضیحات پروژه..." rows={15} required className="font-mono" />
              </div>
            </CardContent>
          </Card>

          {/* ستون کناری (راست) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تنظیمات و مدیا</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="published" className="text-base">انتشار نهایی</Label>
                    <p className="text-sm text-muted-foreground">آیا این پست در سایت نمایش داده شود؟</p>
                  </div>
                  <Switch id="published" name="published" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">آدرس تصویر شاخص</Label>
                  <Input id="imageUrl" name="imageUrl" placeholder="/images/projects/project1.jpg" />
                  <p className="text-xs text-muted-foreground">فایل تصویر را در پوشه public کپی کنید و آدرسش را اینجا بنویسید.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">تگ‌ها</Label>
                  <Input id="tags" name="tags" placeholder="Next.js, React, Tailwind" />
                  <p className="text-xs text-muted-foreground">تگ‌ها را با کاما جدا کنید.</p>
                </div>
              </CardContent>
            </Card>
             
             {/* نمایش پیام‌های خطا یا موفقیت */}
             {state.message && (
                <p className={`text-sm font-medium p-3 rounded text-center border ${
                  state.status === 'error' 
                    ? 'text-red-600 bg-red-50 border-red-200' 
                    : 'text-green-600 bg-green-50 border-green-200'
                }`}>
                  {state.message}
                </p>
             )}

            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  );
}