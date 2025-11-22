import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const projects = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt));
  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">پروژه‌های منتخب</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              لیست آخرین پروژه‌ها و مقالاتی که منتشر کرده‌ام.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/" className="gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" />
              بازگشت به خانه
            </Link>
          </Button>
        </div>
      </FadeIn>

      {projects.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          هنوز پروژه‌ای منتشر نشده است.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1} className="h-full">
              <Card className="flex flex-col h-full overflow-hidden border-muted bg-card/50 transition-all hover:bg-card hover:shadow-md group">
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  {project.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/50">
                      <span className="text-sm">تصویر پروژه</span>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl line-clamp-1">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 h-10">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.tags ? (
                      project.tags.split(",").map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag.trim()}
                        </Badge>
                      ))
                    ) : null}
                  </div>
                </CardContent>

                <CardFooter className="pt-0 mt-auto flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                         {/* ✅ فیکس: تاریخ */}
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString("fa-IR") : ""}
                    </span>
                  <Button variant="default" size="sm" asChild>
                    <Link href={`/projects/${project.slug}`}>
                      مشاهده جزئیات
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}