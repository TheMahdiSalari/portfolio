"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface LiquidCardProps {
  children: React.ReactNode;
  className?: string;
}

export function LiquidCard({ children, className }: LiquidCardProps) {
  // متغیرهای ذخیره موقعیت موس
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    // محاسبه موقعیت نسبی موس داخل کارت
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "relative group rounded-3xl border overflow-hidden",
        // استایل پایه:
        // در لایت مود: کمی طوسی/آبی کمرنگ (slate-100/50)
        // در دارک مود: کاملاً شیشه‌ای و تیره (white/5)
        "bg-slate-100/50 dark:bg-white/5 backdrop-blur-xl",
        "border-slate-200 dark:border-white/10",
        "shadow-xl transition-shadow duration-300 hover:shadow-2xl",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* لایه ۱: افکت نور متحرک (Spotlight) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15), /* رنگ آبی (Blue-500) با شفافیت ۱۵٪ */
              transparent 80%
            )
          `,
        }}
      />

      {/* لایه ۲: افکت هایلایت مخصوص دارک مود (White Glow) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 dark:opacity-100 mix-blend-overlay"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1), /* نور سفید ضعیف */
              transparent 80%
            )
          `,
        }}
      />

      {/* لایه ۳: خط درخشان دور کارت (Border Ring) */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5 dark:ring-white/10 pointer-events-none" />

      {/* محتوای اصلی */}
      <div className="relative px-8 py-10 md:px-12 md:py-14 z-10">
        {children}
      </div>
    </div>
  );
}