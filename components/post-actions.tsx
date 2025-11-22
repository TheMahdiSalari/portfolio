"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { deletePost } from "@/app/dashboard/posts/actions"; // ایمپورت سرور اکشن
import { useTransition } from "react";
import { toast } from "sonner"; // اگر toast داری، اگر نه حذفش کن یا alert بذار

interface PostActionsProps {
  postId: string;
}

export function PostActions({ postId }: PostActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("آیا از حذف این پست اطمینان دارید؟")) {
      startTransition(async () => {
        const result = await deletePost(postId);
        if (!result.success) {
          alert(result.message);
        }
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">منو</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/projects`} className="flex w-full items-center gap-2 cursor-pointer">
            <Eye className="h-4 w-4 text-muted-foreground" />
            مشاهده
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          {/* لینک ادیت: در آینده صفحه ادیت را می‌سازی */}
          <Link href={`/dashboard/posts/${postId}/edit`} className="flex w-full items-center gap-2 cursor-pointer">
            <Pencil className="h-4 w-4 text-muted-foreground" />
            ویرایش
          </Link>
        </DropdownMenuItem>

        {/* دکمه حذف */}
        <DropdownMenuItem 
          onSelect={(e) => e.preventDefault()} // حالا اینجا کار می‌کند چون کلاینت کامپوننت است
          className="text-red-600 focus:bg-red-50"
        >
          <button 
            onClick={handleDelete} 
            disabled={isPending}
            className="flex w-full items-center gap-2 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            {isPending ? "در حال حذف..." : "حذف"}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}