// app/dashboard/layout.tsx
import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Package2,
  Search,
  FileText,
  PlusCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export const metadata = {
  title: "داشبورد مدیریت | مهدی سالاری",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* 🟢 نوار کناری (Sidebar) - ثابت */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">پورتفولیو</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary bg-muted"
              >
                <Home className="h-4 w-4" />
                داشبورد
              </Link>
              <Link
                href="/dashboard/posts"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <FileText className="h-4 w-4" />
                همه پست‌ها
              </Link>
              <Link
                href="/dashboard/posts/new"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <PlusCircle className="h-4 w-4" />
                افزودن پست جدید
              </Link>
            </nav>
          </div>
         
        </div>
      </div>

      {/* 🟢 محتوای اصلی و Header */}
      <div className="flex flex-col">
        {/* ✅ فیکس نهایی Header: استفاده از justify-between برای حل مشکل bunching */}
        <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          
          {/* موبایل Menu Trigger (گروه اول: در دسکتاپ مخفی است) */}
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
              {/* ... (محتوای موبایل) ... */}
            </SheetContent>
          </Sheet>
          
          {/* Search Area (گروه دوم: باید در مرکز باقی بماند) */}
          <div className="flex-1 flex justify-center mx-4"> 
            <form className="w-full max-w-lg hidden sm:block"> {/* Show search on desktop, limit max width */}
              <div className="relative">
                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> 
                <Input
                  type="search"
                  placeholder="جستجو در پست‌ها..."
                  className="w-full appearance-none bg-background pl-8 shadow-none max-w-md pr-8"
                />
              </div>
            </form>
          </div>
          
          {/* User Dropdown (گروه سوم: به انتهای سمت چپ می‌رود) */}
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
              <DropdownMenuItem>خروج</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        
        {/* محتوای اصلی صفحات داشبورد */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}