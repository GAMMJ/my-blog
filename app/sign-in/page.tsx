"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

export default function SignInPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 하드코딩된 인증 정보와 비교
    const validEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (email === validEmail && password === validPassword) {
      // 로그인 성공 - 세션스토리지와 쿠키에 인증 상태 저장
      sessionStorage.setItem("isAuthenticated", "true")
      Cookies.set("isAuthenticated", "true", { expires: 1 }) // 1일 동안 유지
      router.push("/")
      toast({
        title: "로그인 성공",
        description: "환영합니다!",
      })
    } else {
      toast({
        title: "로그인 실패",
        description: "이메일 또는 비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="container max-w-screen-sm py-20">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              이메일
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </Card>
    </div>
  )
} 