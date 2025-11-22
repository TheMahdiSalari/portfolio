"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createPost, type PostFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Image as ImageIcon } from "lucide-react";

const initialState: PostFormState = {
  message: "",
  status: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto md:min-w-[150px]">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="mr-2 h-4 w-4"/> ذخیره پست</>}
    </Button>
  );
}

export default function NewPostPage() {
  const [state, dispatch] = useActionState(createPost, initialState);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">افزودن پست/پروژه جدید</h1>
      </div>
      
      <form action={dispatch}>
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          
          {/* ستون اصلی (چپ) */}
          <Card>
            <CardHeader>
              <CardTitle>محتوای اصلی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان</Label>
                <Input id="title" name="title" required placeholder="عنوان پروژه..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">نامک (Slug)</Label>
                <Input id="slug" name="slug" required className="font-mono text-sm" placeholder="project-url-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">توضیحات کوتاه</Label>
                <Textarea id="description" name="description" rows={3} placeholder="توضیحات مختصر برای کارت..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">محتوای کامل (مارک‌داون)</Label>
                <Textarea id="content" name="content" rows={15} required className="font-mono" placeholder="# عنوان مقاله..." />
              </div>
            </CardContent>
          </Card>

          {/* ستون کناری (راست) */}
          <div className="space-y-6">
            
            {/* کارت تصویر (ساده شده) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  تصویر شاخص
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">آدرس فایل تصویر</Label>
                  {/* ورودی ساده متنی */}
                  <Input 
                    id="imageUrl" 
                    name="imageUrl" 
                    placeholder="/images/projects/my-project.jpg" 
                    dir="ltr"
                  />
                </div>
                
                <div className="text-xs text-muted-foreground bg-muted p-3 rounded border leading-5">
                  <strong>روش کار:</strong><br/>
                  ۱. عکس را در پوشه <code className="bg-background px-1 rounded">public/images</code> پروژه کپی کنید.<br/>
                  ۲. نام فایل را در کادر بالا بنویسید.<br/>
                  مثال: <span className="font-mono">/images/my-pic.jpg</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>تنظیمات</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="published">انتشار نهایی</Label>
                  </div>
                  <Switch id="published" name="published" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">تگ‌ها</Label>
                  <Input id="tags" name="tags" placeholder="React, Next.js" />
                </div>
              </CardContent>
            </Card>
             
             {state.message && (
                <p className={`text-sm font-medium p-3 rounded text-center border ${
                  state.status === 'error' ? 'text-red-600 bg-red-50 border-red-200' : 'text-green-600 bg-green-50 border-green-200'
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