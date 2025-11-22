"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createPost, type PostFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, X, Image as ImageIcon } from "lucide-react";
// ✅ ایمپورت ابزار آپلود
import { UploadDropzone } from "@/lib/uploadthing";
// برای نمایش عکس
import Image from "next/image";

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
  // ✅ استیت برای ذخیره لینک عکس آپلود شده
  const [imageUrl, setImageUrl] = useState<string>("");

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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">توضیحات کوتاه</Label>
                <Textarea id="description" name="description" placeholder="خلاصه‌ای برای نمایش در کارت‌ها..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">محتوای کامل (مارک‌داون)</Label>
                <Textarea id="content" name="content" placeholder="متن کامل پست با فرمت Markdown..." rows={15} required className="font-mono" />
                <p className="text-xs text-muted-foreground">
                  می‌توانید از **متن بولد**، `کد` و لیست‌ها استفاده کنید.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ستون کناری (راست) */}
          <div className="space-y-6">
            
            {/* کارت آپلود تصویر */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>تصویر شاخص</CardTitle>
              </CardHeader>
              <CardContent>
                {/* ✅ اینپوت مخفی برای ارسال لینک عکس به سرور اکشن */}
                <input type="hidden" name="imageUrl" value={imageUrl} />

                {imageUrl ? (
                  <div className="relative aspect-video w-full rounded-md overflow-hidden border">
                    <Image 
                      src={imageUrl} 
                      alt="Preview" 
                      fill 
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 shadow-md"
                      onClick={() => setImageUrl("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // وقتی آپلود تموم شد، لینک رو میگیریم
                      if (res && res[0]) {
                        setImageUrl(res[0].url);
                        console.log("Upload Completed:", res[0].url);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                    appearance={{
                      container: "border-dashed border-2 border-muted-foreground/25 bg-muted/50 h-40",
                      label: "text-muted-foreground text-sm",
                      allowedContent: "text-xs text-muted-foreground/70"
                    }}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تنظیمات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="published" className="text-base">انتشار نهایی</Label>
                    <p className="text-sm text-muted-foreground">نمایش در سایت؟</p>
                  </div>
                  <Switch id="published" name="published" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">تگ‌ها</Label>
                  <Input id="tags" name="tags" placeholder="Next.js, React" />
                </div>
              </CardContent>
            </Card>
             
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