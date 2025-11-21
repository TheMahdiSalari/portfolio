import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// تعریف تایپ برای پروژه‌ها
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  image: string;
}

// دیتای نمونه (در واقعیت شاید از دیتابیس بیاید، اما اینجا برای پورتفولیو استاتیک عالی است)
const projects: Project[] = [
  {
    id: 1,
    title: "پنل مدیریت فروشگاهی",
    description:
      "یک داشبورد مدیریتی کامل با قابلیت مدیریت محصولات، سفارشات و کاربران. طراحی شده با تم Dark و نمودارهای تحلیلی.",
    tags: ["Next.js 16", "TypeScript", "Recharts", "Shadcn UI"],
    demoUrl: "#",
    repoUrl: "https://github.com",
    image: "/images/project-1.jpg", // عکس‌ها رو باید توی پوشه public/images بذاری
  },
  {
    id: 2,
    title: "وب‌سایت شرکتی مدرن",
    description:
      "طراحی لندینگ پیج برای یک شرکت استارتاپی با تمرکز بر پرفورمنس و سئو بالا (Lighthouse 100).",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    repoUrl: "https://github.com",
    image: "/images/project-2.jpg",
  },
  {
    id: 3,
    title: "پلتفرم کاریابی آنلاین",
    description:
      "سیستم جستجوی پیشرفته مشاغل با قابلیت فیلترینگ آنی و درخواست همکاری.",
    tags: ["Next.js", "Supabase", "Zustand"],
    demoUrl: "#",
    image: "/images/project-3.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      {/* هدر صفحه */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">پروژه‌های منتخب</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            چیزهایی که تا الان ساختم و یاد گرفتم.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            بازگشت به خانه
          </Link>
        </Button>
      </div>

      {/* لیست پروژه‌ها - Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden border-muted bg-card/50 transition-all hover:bg-card hover:shadow-md">
            {/* بخش تصویر */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              {/* اینجا از یک div رنگی استفاده میکنیم اگر عکس نبود تا ارور نده */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/50">
                {/* اگر عکس داشتی خط پایین رو آنکامنت کن و عکس رو بذار */}
                {/* <Image src={project.image} alt={project.title} fill className="object-cover" /> */}
                <span className="text-sm">تصویر پروژه</span>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2 mt-2">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 pt-0">
              {project.demoUrl && (
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link href={project.demoUrl} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    مشاهده آنلاین
                  </Link>
                </Button>
              )}
              {project.repoUrl && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={project.repoUrl} target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    سورس کد
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}