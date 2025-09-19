// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Եթե token չկա՝ վերուղղիր login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Թույլատրում ենք մուտքը, եթե token կա
  return NextResponse.next();
}

// Այս կոնֆիգը նշանակում է՝ middleware-ը աշխատում է միայն այս ուղիների վրա
export const config = {
  matcher: ["/dashboard/:path*"], // ⛔ Բացարձակապես արգելում է /dashboard և բոլորը իր մեջ
};
