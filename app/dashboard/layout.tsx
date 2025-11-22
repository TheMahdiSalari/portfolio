import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Package2,
  Search,
  FileText,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const metadata = {
  title: "داشبورد مدیریت | مهدی سالاری",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ✅ تغییر ۱: استفاده از Flex به جای Grid
    // در حالت RTL، اولین فرزند (سایدبار) خودکار می‌رود سمت راست
    <div className="flex min-h-screen w-full">
      
      {/* 🟢 نوار کناری (Sidebar) - دسکتاپ */}
      {/* ✅ تغییر ۲: border-l به جای border-r (چون سایدبار سمت راست است، خط باید سمت چپش باشد) */}
      <aside className="hidden w-[280px] flex-col border-l bg-muted/40 md:flex shrink-0">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>پورتفولیو</span>
          </Link>
          {/* دکمه زنگ اعلان */}
          <Button variant="outline" size="icon" className="mr-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <Home className="h-4 w-4" />
              داشبورد
            </Link>
            <Link
              href="/dashboard/posts"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <FileText className="h-4 w-4" />
              همه پست‌ها
            </Link>
            <Link
              href="/dashboard/posts/new"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <PlusCircle className="h-4 w-4" />
              افزودن پست جدید
            </Link>
          </nav>
        </div>
      </aside>

      {/* 🟢 محتوای اصلی و هدر */}
      {/* این بخش بقیه صفحه را پر می‌کند */}
      <div className="flex flex-col flex-1">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
          
          {/* دکمه منو موبایل (فقط در موبایل دیده می‌شود) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span>پورتفولیو</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  داشبورد
                </Link>
                <Link
                  href="/dashboard/posts"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FileText className="h-5 w-5" />
                  همه پست‌ها
                </Link>
                <Link
                  href="/dashboard/posts/new"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <PlusCircle className="h-5 w-5" />
                  افزودن پست
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          {/* باکس جستجو */}
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="جستجو در پست‌ها..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3 pr-8"
                />
              </div>
            </form>
          </div>
          
          {/* منوی کاربر */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>اکانت مهدی</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>تنظیمات</DropdownMenuItem>
              <DropdownMenuItem>خروج</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        
        {/* کانتنت صفحات */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}