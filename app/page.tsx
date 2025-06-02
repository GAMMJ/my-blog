import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredPosts = [
  {
    id: 1,
    title: "Next.js 15의 새로운 기능들",
    description: "Next.js 15에서 추가된 혁신적인 기능들과 개발자 경험 개선사항을 살펴봅니다.",
    date: "2024-03-15",
    readTime: "5분",
    category: "개발",
    slug: "nextjs-15-features",
  },
  {
    id: 2,
    title: "React Server Components 완벽 가이드",
    description: "서버 컴포넌트의 동작 원리와 실제 프로젝트에서의 활용 방법을 자세히 알아봅니다.",
    date: "2024-03-10",
    readTime: "8분",
    category: "React",
    slug: "react-server-components",
  },
  {
    id: 3,
    title: "TypeScript 5.0 마이그레이션 가이드",
    description: "TypeScript 5.0으로 업그레이드하면서 주의해야 할 점들과 새로운 기능들을 소개합니다.",
    date: "2024-03-05",
    readTime: "6분",
    category: "TypeScript",
    slug: "typescript-5-migration",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            개발자의 <span className="text-primary">성장 이야기</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            웹 개발, 프로그래밍, 그리고 기술에 대한 깊이 있는 인사이트를 공유합니다.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/blog">
                블로그 둘러보기 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/resume">이력서 보기</Link>
            </Button>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">최신 포스트</h2>
            <Button variant="ghost" asChild>
              <Link href="/blog">
                전체 보기 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                    <Clock className="h-4 w-4 ml-2" />
                    {post.readTime}
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {post.category}
                  </Badge>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 mb-4">{post.description}</CardDescription>
                  <Button variant="ghost" className="p-0 h-auto" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      자세히 읽기 <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-muted/50 rounded-lg">
          <div className="text-center max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">안녕하세요!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              저는 웹 개발에 열정을 가진 개발자입니다. 새로운 기술을 배우고 경험을 공유하는 것을 좋아하며, 이 블로그를
              통해 개발 여정에서 얻은 인사이트들을 나누고 있습니다.
            </p>
            <Button asChild>
              <Link href="/resume">더 자세한 소개 보기</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
