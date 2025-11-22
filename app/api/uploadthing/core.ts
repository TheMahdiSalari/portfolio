import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getSession } from "@/lib/auth"; // برای چک کردن لاگین بودن

const f = createUploadthing();

export const ourFileRouter = {
  // روت آپلود عکس برای پروژه‌ها
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      // فقط ادمین لاگین شده حق آپلود داره
      const session = await getSession();
      if (!session) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;