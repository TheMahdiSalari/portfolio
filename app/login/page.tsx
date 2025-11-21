"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthParticles } from "@/components/auth-particles";
import { Loader2, Terminal } from "lucide-react";

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "ورود به داشبورد"}
    </Button>
  );
}

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* پس‌زمینه پارتیکل */}
      <AuthParticles />

      {/* کارت لاگین */}
      <Card className="w-full max-w-md relative z-10 mx-4 backdrop-blur-sm bg-background/80 border-muted/40 shadow-2xl">
        <CardHeader className="space-y-1 text-center items-center">
          <div className="bg-primary text-primary-foreground p-2 rounded-md mb-2">
            <Terminal size={24} />
          </div>
          <CardTitle className="text-2xl font-bold">ورود مدیر</CardTitle>
          <CardDescription>
            برای دسترسی به داشبورد، ایمیل و رمز عبور خود را وارد کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            
            {errorMessage && (
              <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
            )}
            
            <LoginButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}