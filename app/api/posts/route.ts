import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

export async function GET() {
  try {
    const posts = await db.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("[POSTS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, content, categoryId, featuredImage } = body

    if (!title || !content || !categoryId) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const post = await db.post.create({
      data: {
        title,
        content,
        categoryId,
        featuredImage,
        authorId: userId,
        published: true,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("[POSTS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 