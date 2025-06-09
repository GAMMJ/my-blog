import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Only public routes are listed here - all other routes will require authentication
export function middleware(request: NextRequest) {
  // 로그인이 필요한 경로들
  const protectedPaths = ["/write"]
  
  // 현재 경로가 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    // 세션스토리지의 인증 상태 확인
    const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true"

    if (!isAuthenticated) {
      // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/write/:path*",
    "/post/:path*",
  ],
} 