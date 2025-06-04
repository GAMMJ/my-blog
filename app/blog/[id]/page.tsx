import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

async function getPost(id: string) {
  const post = await db.post.findUnique({
    where: {
      id: id
    },
    include: {
      author: true,
      category: true
    }
  })

  if (!post) {
    return null
  }

  return post
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <article className="container max-w-3xl py-10">
      <div className="space-y-4">
        {/* Category */}
        <div className="text-sm text-muted-foreground">
          in {post.category.name}
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold">{post.title}</h1>
        
        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="rounded-full overflow-hidden w-6 h-6">
              {post.author.image && (
                <img 
                  src={post.author.image} 
                  alt={post.author.name || "Author"} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span>{post.author.name}</span>
          </div>
          <div>
            {format(new Date(post.createdAt), "PPP", { locale: ko })}
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  )
} 