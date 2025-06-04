"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    try {
      // TODO: 실제 로그인 로직 구현
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("로그인에 실패했습니다.")
      }

      // 로그인 성공 후 원래 가려던 페이지로 리다이렉트
      const from = searchParams.get("from") || "/"
      router.push(from)
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">로그인</h1>
          <p className="text-muted-foreground mt-2">
            블로그 관리를 위해 로그인해주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>
      </main>
    </div>
  )
} 