import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Terminal } from "lucide-react";

export function Navbar() {
  // ✅ آیتم‌ها آپدیت شدند
  const navItems = [
    { name: "خانه", href: "/" },
    { name: "پروژه‌ها", href: "/projects" },
    { name: "درباره من", href: "/about" },
    { name: "تماس با من", href: "/contact" }, // اضافه شد
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        
        {/* لوگو */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <Terminal size={20} />
            </div>
            <span>پورتفولیو</span>
          </Link>
        </div>

        {/* منوی وسط - دسکتاپ */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          {/* لینک رزومه را جدا کردم که خاص‌تر باشه (اختیاری) */}
          <Link 
             href="/resume.pdf" 
             target="_blank"
             className="text-sm font-medium text-primary transition-colors hover:opacity-80"
          >
            رزومه (PDF)
          </Link>
        </nav>

        {/* آیکون‌های سوشال */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com" target="_blank" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}