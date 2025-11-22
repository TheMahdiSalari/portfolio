import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
          "min-h-screen bg-background font-sans antialiased text-foreground",
          vazir.variable
        )}
      >
        {/* این فایل فقط HTML و Body را مدیریت می‌کند */}
        {children}
      </body>
    </html>
  );
}