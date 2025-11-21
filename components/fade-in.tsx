"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number; // تاخیر دلخواه برای نوبتی ظاهر شدن
  className?: string;
}

export function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // وضعیت شروع: نامرئی و ۲۰ پیکسل پایین‌تر
      animate={{ opacity: 1, y: 0 }}  // وضعیت پایان: مرئی و سر جای اصلی
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}