import { Header } from "@/components/header"
import { BlogContent } from "@/components/blog-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// BlogPost 에 대한 명백한 타입 정의 인터페이스
interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: string;
  content: string;
}

// 실제 프로젝트에서는 데이터베이스나 CMS에서 가져올 데이터
const blogPosts: Record<string, BlogPost> = {
  "nextjs-15-features": {
    id: 1,
    title: "Next.js 15의 새로운 기능들",
    description: "Next.js 15에서 추가된 혁신적인 기능들과 개발자 경험 개선사항을 살펴봅니다.",
    date: "2024-03-15",
    readTime: "5분",
    category: "개발",
    tags: ["Next.js", "React", "웹개발"],
    author: "김개발",
    content: `
# Next.js 15의 새로운 기능들

Next.js 15가 출시되면서 많은 개발자들이 기대했던 기능들이 추가되었습니다. 이번 포스트에서는 주요 변경사항들을 살펴보겠습니다.

## 주요 개선사항

### 1. 향상된 App Router 성능

App Router의 성능이 크게 개선되었습니다. 특히 서버 컴포넌트의 렌더링 속도가 30% 향상되었습니다.

\`\`\`javascript
// 새로운 캐싱 전략 예제
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // 1시간 캐시
  })
  
  return <div>{data.title}</div>
}
\`\`\`

### 2. 새로운 이미지 최적화

이미지 최적화 기능이 더욱 강력해졌습니다.

![Next.js 로고](/placeholder.svg?height=200&width=400)

### 3. 개발자 도구 개선

개발 환경에서의 디버깅이 더욱 쉬워졌습니다:

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`)
  return response.json()
}
\`\`\`

## 마이그레이션 가이드

기존 Next.js 14에서 15로 업그레이드하는 방법:

1. 패키지 업데이트
2. 설정 파일 수정
3. 코드 리팩토링

### 비디오 예제

<video controls width="100%" style="max-width: 600px;">
  <source src="/placeholder-video.mp4" type="video/mp4">
  브라우저가 비디오를 지원하지 않습니다.
</video>

## 결론

Next.js 15는 개발자 경험과 성능 모두에서 큰 발전을 이뤘습니다. 새로운 프로젝트를 시작한다면 적극 고려해볼 만합니다.

> **팁**: 마이그레이션 전에 반드시 테스트 환경에서 충분히 검증해보세요.

### 관련 링크

- [Next.js 공식 문서](https://nextjs.org)
- [마이그레이션 가이드](https://nextjs.org/docs/upgrading)
    `,
  },
  "react-server-components": {
    id: 2,
    title: "React Server Components 완벽 가이드",
    description: "서버 컴포넌트의 동작 원리와 실제 프로젝트에서의 활용 방법을 자세히 알아봅니다.",
    date: "2024-03-10",
    readTime: "8분",
    category: "React",
    tags: ["React", "Server Components", "성능"],
    author: "김개발",
    content: `
# React Server Components 완벽 가이드

React Server Components는 React 18에서 도입된 혁신적인 기능입니다.

## 서버 컴포넌트란?

서버 컴포넌트는 서버에서 렌더링되어 클라이언트로 전송되는 컴포넌트입니다.

\`\`\`jsx
// 서버 컴포넌트 예제
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data')
  const posts = await data.json()
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}
\`\`\`

![서버 컴포넌트 아키텍처](/images/blog-example-1.png)

## 클라이언트 컴포넌트와의 차이점

| 특징 | 서버 컴포넌트 | 클라이언트 컴포넌트 |
|------|---------------|-------------------|
| 렌더링 위치 | 서버 | 클라이언트 |
| 번들 크기 | 포함되지 않음 | 포함됨 |
| 상태 관리 | 불가능 | 가능 |
| 이벤트 핸들러 | 불가능 | 가능 |

### 실제 사용 예제

\`\`\`typescript
'use client' // 클라이언트 컴포넌트 지시어

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
\`\`\`

![코드 예제](/images/blog-example-2.png)

## 성능 최적화

서버 컴포넌트를 사용하면 다음과 같은 이점이 있습니다:

- 번들 크기 감소
- 초기 로딩 속도 향상
- SEO 개선

\`\`\`bash
# 성능 측정 명령어
npm run build
npm run analyze
\`\`\`
    `,
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            블로그로 돌아가기
          </Link>
        </Button>

        {/* Article Header */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <header className="mb-8 pb-8 border-b">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              {post.date}
              <Clock className="h-4 w-4 ml-2" />
              {post.readTime}
            </div>

            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>

            <p className="text-xl text-muted-foreground mb-6">{post.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">{post.author[0]}</span>
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">개발자</p>
                </div>
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                공유하기
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <BlogContent content={post.content} />
        </article>

        {/* Related Posts */}
        <section className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">관련 포스트</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(blogPosts)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, relatedPost]) => (
                <Link
                  key={key}
                  href={`/blog/${key}`}
                  className="block p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <Badge variant="secondary" className="mb-2">
                    {relatedPost.category}
                  </Badge>
                  <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.description}</p>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}
