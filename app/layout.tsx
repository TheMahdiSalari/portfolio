import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { ParticlesBackground } from "@/components/particles-background"; // ✅ 1. ایمپورت شد

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "پورتفولیو مهدی سالاری",
  description: "ساخته شده با Next.js 16 و shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground relative", // relative اضافه شد برای اطمینان
          vazir.variable
        )}
      >
        {/* ✅ 2. پارتیکل‌ها اینجا قرار می‌گیرند، پشت همه چیز */}
        <ParticlesBackground />
        
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          
          <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl relative z-10">
            {/* z-10 برای اینکه محتوا حتما روی پارتیکل‌ها باشه */}
            {children}
          </main>
          
          <footer className="border-t py-6 text-center text-sm text-muted-foreground relative z-10">
            © {new Date().getFullYear()} طراحی شده با ❤️ و Next.js توسط مهدی سالاری
          </footer>
        </div>
      </body>
    </html>
  );
}