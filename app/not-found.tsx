"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="page-container">
      <Header />
      <main className="content-container">
        <div className="text-center py-16">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">페이지를 찾을 수 없습니다</h2>
            <p className="text-muted-foreground">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              이전 페이지
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
