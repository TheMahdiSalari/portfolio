import { Navbar } from "@/components/navbar";
import { ParticlesBackground } from "@/components/particles-background";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* ✅ پارتیکل‌ها فقط اینجا هستند */}
      <ParticlesBackground />
      
      {/* نوبار هم فقط در صفحات عمومی باشد بهتر است */}
      <Navbar />
      
      <main className="flex-1 container mx-auto max-w-4xl relative z-10 px-4 py-8">
        {children}
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground relative z-10 mt-auto">
        © {new Date().getFullYear()} طراحی شده با ❤️ و Next.js
      </footer>
    </div>
  );
}