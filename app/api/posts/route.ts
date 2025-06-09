import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { Prisma } from "@prisma/client"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error("[POSTS_GET]", error)
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.get("isAuthenticated")?.value === "true"

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const json = await request.json()
    const { title, content, categoryId } = json

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { error: "Title, content and category are required" },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        categoryId,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("[POST_CREATE]", error)
    return NextResponse.json(
      { error: "Error creating post" },
      { status: 500 }
    )
  }
} 