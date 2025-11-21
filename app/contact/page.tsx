import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "تماس با من",
  description: "راه‌های ارتباطی و فرم ارسال پیام",
};

export default function ContactPage() {
  return (
    <div className="space-y-8 md:space-y-12 pb-10">
      {/* هدر صفحه */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">تماس با من</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          پروژه‌ای در ذهن دارید یا می‌خواهید سلام کنید؟ 
          فرم زیر را پر کنید یا از طریق راه‌های ارتباطی مستقیم پیام دهید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* سایدبار اطلاعات تماس (سمت راست در RTL) */}
        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">ایمیل</h3>
                  <p className="text-muted-foreground text-sm mt-1 break-all">
                    your.email@example.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">موقعیت</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    تهران، ایران (دورکاری)
                  </p>
                </div>
              </div>

              {/* اگر شماره تماس می‌خواهی بگذاری */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">تلگرام</h3>
                  <p className="text-muted-foreground text-sm mt-1 ltr:text-left">
                    @your_username
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-2">ساعات پاسخگویی</h3>
              <p className="text-primary-foreground/80 text-sm leading-6">
                من معمولاً در کمتر از ۲۴ ساعت به ایمیل‌ها پاسخ می‌دهم. 
                برای کارهای فوری لطفاً در تلگرام پیام دهید.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* فرم تماس (سمت چپ در RTL) */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          <Card>
            <CardContent className="p-6 md:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}