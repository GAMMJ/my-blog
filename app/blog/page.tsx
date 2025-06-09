import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { prisma } from "@/lib/prisma"
import { WriteButton } from "@/components/write-button"

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return posts
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

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
          <WriteButton />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.createdAt.toISOString()}>
                      {format(post.createdAt, "PPP", { locale: ko })}
                    </time>
                    <Clock className="h-4 w-4 ml-2" />
                    <time dateTime={post.createdAt.toISOString()}>
                      {format(post.createdAt, "p", { locale: ko })}
                    </time>
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
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    자세히 읽기 <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
