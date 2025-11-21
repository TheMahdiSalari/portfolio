import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

// تعریف اینترفیس‌ها
interface UserPayload {
  id: string;
  email: string;
}

export interface SessionPayload extends JWTPayload {
  user: UserPayload;
  expires: Date | string;
}

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as unknown as SessionPayload;
}

export async function getSession(): Promise<SessionPayload | null> {
  // ✅ اصلاح: اضافه کردن await برای cookies()
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch (error) {
    return null;
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  
  const user: UserPayload = { 
    email: email, 
    id: "admin_id" 
  };

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ user, expires });

  // ✅ اصلاح: اضافه کردن await برای cookies()
  const cookieStore = await cookies();
  
  cookieStore.set("session", session, { 
    expires, 
    httpOnly: true, 
    sameSite: 'lax', 
    secure: process.env.NODE_ENV === 'production' 
  });
}

export async function logout() {
  // ✅ اصلاح: اضافه کردن await برای cookies()
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function updateSession(request: NextRequest) {
  // در Middleware و NextRequest کوکی‌ها هنوز سینک هستند، اما برای اطمینان و استاندارد بودن:
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  try {
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    const res = NextResponse.next();
    
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires as Date,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    return res;
  } catch (error) {
    return NextResponse.next();
  }
}