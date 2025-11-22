import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
// ✅ کامپوننت جدید را ایمپورت کن
import { PostActions } from "@/components/post-actions";

export default async function PostsPage() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">مدیریت پست‌ها</h1>
        <Button asChild>
          <Link href="/dashboard/posts/new" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            پست جدید
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">عنوان</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-right">تاریخ ایجاد</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  هیچ پستی یافت نشد.
                </TableCell>
              </TableRow>
            ) : (
              allPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    {post.published ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        منتشر شده
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                        پیش‌نویس
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {post.createdAt 
                      ? new Date(post.createdAt).toLocaleDateString("fa-IR") 
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {/* ✅ استفاده از کامپوننت کلاینتی */}
                    <PostActions postId={post.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}