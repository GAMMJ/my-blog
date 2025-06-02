"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Next.js 15의 새로운 기능들",
    description:
      "Next.js 15에서 추가된 혁신적인 기능들과 개발자 경험 개선사항을 살펴봅니다. App Router의 성능 개선, 새로운 캐싱 전략, 그리고 개발 도구의 향상된 기능들을 자세히 다룹니다.",
    date: "2024-03-15",
    readTime: "5분",
    category: "개발",
    tags: ["Next.js", "React", "웹개발"],
    slug: "nextjs-15-features",
  },
  {
    id: 2,
    title: "React Server Components 완벽 가이드",
    description:
      "서버 컴포넌트의 동작 원리와 실제 프로젝트에서의 활용 방법을 자세히 알아봅니다. 클라이언트 컴포넌트와의 차이점, 데이터 페칭 전략, 그리고 성능 최적화 방법까지 포괄적으로 다룹니다.",
    date: "2024-03-10",
    readTime: "8분",
    category: "React",
    tags: ["React", "Server Components", "성능"],
    slug: "react-server-components",
  },
  {
    id: 3,
    title: "TypeScript 5.0 마이그레이션 가이드",
    description:
      "TypeScript 5.0으로 업그레이드하면서 주의해야 할 점들과 새로운 기능들을 소개합니다. 데코레이터 지원, 새로운 타입 시스템 개선사항, 그리고 성능 향상에 대해 알아봅니다.",
    date: "2024-03-05",
    readTime: "6분",
    category: "TypeScript",
    tags: ["TypeScript", "마이그레이션", "타입시스템"],
    slug: "typescript-5-migration",
  },
  {
    id: 4,
    title: "웹 성능 최적화 실전 가이드",
    description:
      "실제 프로젝트에서 적용할 수 있는 웹 성능 최적화 기법들을 소개합니다. 이미지 최적화, 코드 스플리팅, 캐싱 전략 등 다양한 방법을 실습과 함께 설명합니다.",
    date: "2024-02-28",
    readTime: "10분",
    category: "성능",
    tags: ["성능최적화", "웹개발", "사용자경험"],
    slug: "web-performance-optimization",
  },
  {
    id: 5,
    title: "모던 CSS 레이아웃 기법",
    description:
      "CSS Grid와 Flexbox를 활용한 현대적인 레이아웃 구성 방법을 알아봅니다. 반응형 디자인 구현과 브라우저 호환성 고려사항도 함께 다룹니다.",
    date: "2024-02-20",
    readTime: "7분",
    category: "CSS",
    tags: ["CSS", "레이아웃", "반응형"],
    slug: "modern-css-layout",
  },
  {
    id: 6,
    title: "JavaScript 비동기 프로그래밍 마스터하기",
    description:
      "Promise, async/await, 그리고 최신 비동기 패턴들을 깊이 있게 다룹니다. 에러 핸들링과 성능 고려사항도 함께 알아봅니다.",
    date: "2024-02-15",
    readTime: "9분",
    category: "JavaScript",
    tags: ["JavaScript", "비동기", "Promise"],
    slug: "javascript-async-programming",
  },
]

const categories = ["전체", "개발", "React", "TypeScript", "성능", "CSS", "JavaScript"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">블로그</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            개발과 기술에 대한 생각과 경험을 공유합니다
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="포스트 제목, 내용, 태그로 검색..." />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">{filteredPosts.length}개의 포스트를 찾았습니다</p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader className="flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                  <Clock className="h-4 w-4 ml-2" />
                  {post.readTime}
                </div>
                <Badge variant="secondary" className="w-fit mb-2">
                  {post.category}
                </Badge>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 flex-grow">{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" className="p-0 h-auto" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    자세히 읽기 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">검색 결과가 없습니다.</p>
            <p className="text-muted-foreground">다른 키워드로 검색해보세요.</p>
          </div>
        )}
      </main>
    </div>
  )
}
