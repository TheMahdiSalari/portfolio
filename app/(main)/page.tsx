import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpLeft } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { LiquidCard } from "@/components/liquid-card";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const recentPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(3);

  return (
    <section className="flex flex-col items-center text-center pt-20 md:pt-32 pb-16 space-y-16 relative overflow-hidden">
      
      <LiquidCard className="max-w-4xl w-full mx-4">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
            سلام، من{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400 drop-shadow-sm">
              مهدی سالاری
            </span>{" "}
            هستم.
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium mt-6">
            یکی از هزاران هزار دوستدار کامپیوتر. <br className="hidden md:block" />
            عاشق ساختن رابط‌های کاربری مینیمال، سریع و مدرن با Next.js.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-8">
            <Button asChild size="lg" className="font-bold text-base px-8 h-12 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                <Link href="/projects">
                دیدن پروژه‌ها
                </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="font-medium text-base px-8 h-12 rounded-full border-primary/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                <Link href="/about" className="flex items-center gap-2">
                درباره من <ArrowLeft className="w-4 h-4" />
                </Link>
            </Button>
            </div>
        </FadeIn>
      </LiquidCard>

      <div className="w-full mt-24 pt-16 border-t max-w-3xl mx-auto text-right px-4">
        <FadeIn delay={0.6}>
             <h2 className="text-3xl font-bold mb-10 tracking-tight text-center md:text-right">نوشته‌های اخیر</h2>
        </FadeIn>
        
        <div className="grid gap-6">
          {recentPosts.length > 0 ? (
            recentPosts.map((post, index) => (
              <FadeIn key={post.id} delay={0.7 + index * 0.1}>
                <Link href={`/projects/${post.slug}`} className="group block p-6 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:shadow-md hover:-translate-y-1">
                    <article className="flex justify-between items-start">
                    <div className="space-y-3">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                        {/* ✅ فیکس: چک کردن نال بودن تاریخ */}
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString("fa-IR") : "---"} — {post.description}
                        </p>
                    </div>
                    <ArrowUpLeft className="w-6 h-6 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 mt-1 mr-4" />
                    </article>
                </Link>
              </FadeIn>
            ))
          ) : (
            <p className="text-center text-muted-foreground">هنوز نوشته‌ای منتشر نشده است.</p>
          )}
        </div>
      </div>
    </section>
  );
}