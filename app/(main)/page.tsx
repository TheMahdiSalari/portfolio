import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpLeft } from "lucide-react";
import { FadeIn } from "@/components/fade-in"; // ✅ ایمپورت شد

export default function Home() {
  return (
    <section className="flex flex-col items-center text-center pt-20 md:pt-32 pb-16 space-y-16 relative">
      
      {/* افکت نور پس‌زمینه */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 blur-[100px] rounded-full opacity-50 dark:opacity-30"></div>
      </div>

      {/* بخش معرفی (Hero Section) */}
      {/* افکت شیشه‌ای که قبلاً اضافه کردی رو اینجا نگه داشتم */}
      <div className="max-w-4xl space-y-6 relative z-10 p-8 rounded-3xl bg-background/30 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/5 dark:border-white/5">
        
        {/* انیمیشن ۱: تیتر اصلی (بدون تاخیر) */}
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
            سلام، من{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400">
              مهدی سالاری
            </span>{" "}
            هستم.
          </h1>
        </FadeIn>

        {/* انیمیشن ۲: توضیحات (با ۰.۲ ثانیه تاخیر) */}
        <FadeIn delay={0.2}>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
            یکی از هزاران هزار دوستدار کامپیوتر. <br className="hidden md:block" />
            عاشق ساختن رابط‌های کاربری مینیمال، سریع و مدرن با Next.js.
          </p>
        </FadeIn>
        
        {/* انیمیشن ۳: دکمه‌ها (با ۰.۴ ثانیه تاخیر) */}
        <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-6">
            <Button asChild size="lg" className="font-bold text-base px-8 h-12 rounded-full">
                <Link href="/projects">
                دیدن پروژه‌ها
                </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="font-medium text-base px-8 h-12 rounded-full">
                <Link href="/about" className="flex items-center gap-2">
                درباره من <ArrowLeft className="w-4 h-4" />
                </Link>
            </Button>
            </div>
        </FadeIn>
      </div>

      {/* بخش نوشته‌های اخیر */}
      <div className="w-full mt-24 pt-16 border-t max-w-3xl mx-auto text-right">
        <FadeIn delay={0.6}>
             <h2 className="text-3xl font-bold mb-10 tracking-tight text-center md:text-right">نوشته‌های اخیر</h2>
        </FadeIn>
        
        <div className="grid gap-6">
          {/* کارت ۱ */}
          <FadeIn delay={0.7}>
            <Link href="#" className="group block p-6 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:shadow-md hover:-translate-y-1">
                <article className="flex justify-between items-start">
                <div className="space-y-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                    چرا Next.js 16 بهترین انتخاب برای پروژه‌های مدرن است؟
                    </h3>
                    <p className="text-muted-foreground text-sm">
                    ۲ آذر ۱۴۰۳ — ۵ دقیقه مطالعه
                    </p>
                </div>
                <ArrowUpLeft className="w-6 h-6 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 mt-1 mr-4" />
                </article>
            </Link>
          </FadeIn>

          {/* کارت ۲ */}
          <FadeIn delay={0.8}>
            <Link href="#" className="group block p-6 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:shadow-md hover:-translate-y-1">
                <article className="flex justify-between items-start">
                <div className="space-y-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                    تجربه من در استفاده از shadcn/ui در پروژه‌های بزرگ
                    </h3>
                    <p className="text-muted-foreground text-sm">
                    ۲۰ آبان ۱۴۰۳ — ۳ دقیقه مطالعه
                    </p>
                </div>
                <ArrowUpLeft className="w-6 h-6 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 mt-1 mr-4" />
                </article>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}