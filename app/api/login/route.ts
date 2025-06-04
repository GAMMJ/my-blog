import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 환경 변수 확인
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("관리자 계정 정보가 환경 변수에 설정되지 않았습니다.")
}

export async function POST(request: NextRequest) {
  try {
    // 환경 변수가 설정되지 않은 경우
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "서버 설정 오류가 발생했습니다." },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email, password } = body

    // 실제 환경에서는 데이터베이스에서 사용자를 확인하고
    // 비밀번호를 안전하게 검증해야 합니다
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const response = NextResponse.json(
        { message: "로그인 성공" },
        { status: 200 }
      )

      // 세션 쿠키 설정 (실제로는 더 안전한 방식 사용)
      response.cookies.set({
        name: "session",
        value: "your-session-value",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 // 24시간
      })

      return response
    }

    return NextResponse.json(
      { message: "이메일 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    )
  } catch (error) {
    console.error("로그인 처리 중 오류 발생:", error)
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    )
  }
} 