"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, PenSquare } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

async function getPosts() {
  const res = await fetch("/api/posts")
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

const categories = ["전체", "개발", "React", "TypeScript", "성능", "CSS", "JavaScript"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  })

  const filteredPosts = useMemo(() => {
    return posts.filter((post: any) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "전체" || post.category.name === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategory])

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

        {/* Write Button */}
        <div className="flex justify-end mb-8">
          <Button asChild>
            <Link href="/blog/write">
              <PenSquare className="w-4 h-4 mr-2" />
              글쓰기
            </Link>
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="포스트 제목, 내용으로 검색..." />

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

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">포스트를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">포스트를 불러오는데 실패했습니다.</p>
          </div>
        ) : (
          <>
            {/* Blog Posts Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post: any) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(post.createdAt), "PPP", { locale: ko })}
                      <Clock className="h-4 w-4 ml-2" />
                      {Math.ceil(post.content.length / 500)}분
                    </div>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {post.category.name}
                    </Badge>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="ghost" className="p-0 h-auto" asChild>
                      <Link href={`/blog/${post.id}`}>
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
          </>
        )}
      </main>
    </div>
  )
}
