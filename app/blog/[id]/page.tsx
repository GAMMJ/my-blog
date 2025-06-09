import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Share2, Trash2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { BlogContent } from "@/components/blog-content"
import { DeletePost } from "./delete-post"

interface PageProps {
  params: {
    id: string
  }
}

async function getPost(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        category: true,
      },
    })
    return post
  } catch (error) {
    console.error("Failed to fetch post:", error)
    return null
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            블로그로 돌아가기
          </Link>
        </Button>

        {/* Article Header */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <header className="mb-8 pb-8 border-b">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.createdAt), "PPP", { locale: ko })}
              <Clock className="h-4 w-4 ml-2" />
              {Math.ceil(post.content.length / 500)}분
            </div>

            <Badge variant="secondary" className="mb-4">
              {post.category.name}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">
                    {post.author?.name?.[0] || "G"}
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-medium leading-none">{post.author?.name || "GAMMJ"}</p>
                  <p className="text-sm text-muted-foreground leading-none mt-1">작성자</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DeletePost postId={post.id} />
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  공유하기
                </Button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <BlogContent content={post.content} />
        </article>
      </main>
    </div>
  )
} 