import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // اگر نصب نکردی خطش رو پاک کن یا جاش <hr /> بذار
import { Download, Briefcase, GraduationCap, Code2, Calendar, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "درباره من | رزومه کاری",
  description: "سوابق شغلی، مهارت‌ها و تجربیات من به عنوان توسعه‌دهنده فول‌استک.",
};

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-10">
      
      {/* ۱. بخش معرفی (Bio) */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">درباره من</h1>
        <div className="text-lg text-muted-foreground leading-8 space-y-4">
          <p>
            سلام! من یک توسعه‌دهنده نرم‌افزار با بیش از ۵ سال تجربه در دنیای وب هستم. 
            تمرکز اصلی من روی اکوسیستم جاوااسکریپت (React, Next.js, Node.js) است و عاشق حل مسائل پیچیده و خلق رابط‌های کاربری تمیز هستم.
          </p>
          <p>
            در حال حاضر به عنوان Senior Frontend Developer فعالیت می‌کنم و روی پرفورمنس وب و معماری مقیاس‌پذیر تمرکز دارم.
            وقتی کد نمی‌زنم، احتمالا دارم درباره تکنولوژی‌های جدید مطالعه می‌کنم یا در طبیعت قدم می‌زنم.
          </p>
        </div>
        
        {/* دکمه دانلود رزومه */}
        <div className="pt-4">
          <Button className="gap-2" size="lg" asChild>
            <Link href="/resume.pdf" target="_blank"> {/* فایل رزومه باید در پوشه public باشه */}
              <Download className="h-4 w-4" />
              دانلود رزومه (PDF)
            </Link>
          </Button>
        </div>
      </section>

      <Separator className="my-8" />

      {/* ۲. مهارت‌ها (Skills) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight">مهارت‌های فنی</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* مهارت‌های فرانت‌اند */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Frontend Development</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["React.js", "Next.js 16", "TypeScript", "Tailwind CSS", "Redux Toolkit", "React Query", "Shadcn/ui"].map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </CardContent>
          </Card>

          {/* مهارت‌های بک‌اند و ابزارها */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Backend & Tools</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["Node.js", "Express", "PostgreSQL", "Prisma", "Docker", "Git", "CI/CD", "Linux"].map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ۳. سوابق شغلی (Experience) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight">سوابق شغلی</h2>
        </div>

        <div className="space-y-6">
          {/* شغل ۱ */}
          <div className="flex flex-col gap-2 border-r-2 border-muted pr-4 relative">
            {/* دایره روی خط زمان */}
            <div className="absolute -right-[9px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-background" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-xl font-bold">Senior Frontend Developer</h3>
              <Badge variant="secondary" className="w-fit">۱۴۰۱ - اکنون</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">نام شرکت (مثلا دیجی‌کالا)</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/> تهران</span>
            </div>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm md:text-base">
              <li>رهبری تیم فرانت‌‌اند و بازنویسی پنل ادمین با Next.js.</li>
              <li>بهبود پرفورمنس (Core Web Vitals) و کاهش زمان لود اولیه تا ۴۰٪.</li>
              <li>پیاده‌سازی دیزاین سیستم اختصاصی با استفاده از Tailwind.</li>
            </ul>
          </div>

          {/* شغل ۲ */}
          <div className="flex flex-col gap-2 border-r-2 border-muted pr-4 relative">
            <div className="absolute -right-[9px] top-1 h-4 w-4 rounded-full bg-muted-foreground/30 border-4 border-background" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-xl font-bold">Web Developer</h3>
              <Badge variant="outline" className="w-fit">۱۳۹۸ - ۱۴۰۱</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">شرکت نرم‌افزاری نمونه</span>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              توسعه وب‌سایت‌های فروشگاهی با React و Redux. همکاری نزدیک با تیم طراحی و بک‌اند برای پیاده‌سازی RESTful APIها.
            </p>
          </div>
        </div>
      </section>

      {/* ۴. تحصیلات (Education) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight">تحصیلات</h2>
        </div>
        
        <Card>
          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">کارشناسی مهندسی کامپیوتر</h3>
              <p className="text-muted-foreground">دانشگاه تهران</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              ۱۳۹۴ - ۱۳۹۸
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}