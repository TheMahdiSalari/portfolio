import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";
// ✅ اضافه کردن کامپوننت شیشه‌ای
import { LiquidCard } from "@/components/liquid-card";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await db.query.posts.findFirst({
    where: eq(posts.slug, resolvedParams.slug),
  });

  if (!project) return { title: "پروژه یافت نشد" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  
  const project = await db.query.posts.findFirst({
    where: eq(posts.slug, resolvedParams.slug),
  });

  if (!project || !project.published) {
    notFound();
  }

  return (
    // یک Wrapper برای فاصله دادن از بالا و پایین
    <div className="py-10 md:py-20 px-4 flex justify-center">
      
      {/* ✅ محتوا داخل کارت شیشه‌ای */}
      <LiquidCard className="max-w-4xl w-full mx-auto backdrop-blur-2xl bg-background/60 dark:bg-black/40 border-white/20 shadow-2xl">
        
        <article className="space-y-8 md:space-y-10 px-2 md:px-4">
          {/* Breadcrumb Navigation */}
          <FadeIn>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">خانه</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/projects" className="hover:text-primary transition-colors">پروژه‌ها</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium truncate max-w-[150px] md:max-w-xs opacity-70">{project.title}</span>
            </div>
          </FadeIn>

          {/* Header Section */}
          <FadeIn delay={0.1} className="space-y-6 text-center md:text-right border-b border-border/50 pb-8">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full text-primary border border-primary/10">
                <Calendar className="h-4 w-4" />
                <span>
                  {project.createdAt ? new Date(project.createdAt).toLocaleDateString("fa-IR", { day: 'numeric', month: 'long', year: 'numeric' }) : "---"}
                </span>
              </div>
              
              {project.tags && (
                <div className="flex gap-2">
                  {project.tags.split(",").map((tag) => (
                    <Badge key={tag} variant="outline" className="px-3 py-1 border-primary/20">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Featured Image */}
          {project.imageUrl && (
            <FadeIn delay={0.2}>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-muted shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>
            </FadeIn>
          )}

          {/* Content Body */}
          <FadeIn delay={0.3}>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-8 text-foreground/90 text-justify">
                  {project.content}
              </div>
            </div>
          </FadeIn>

          {/* Footer Navigation */}
          <FadeIn delay={0.4}>
            <div className="border-t border-border/50 pt-8 mt-10 flex justify-between items-center">
              <Button variant="secondary" size="lg" asChild className="gap-2 rounded-full pl-6 pr-8">
                <Link href="/projects">
                  <ArrowRight className="h-4 w-4" />
                  بازگشت به لیست
                </Link>
              </Button>
            </div>
          </FadeIn>

        </article>
      </LiquidCard>
    </div>
  );
}