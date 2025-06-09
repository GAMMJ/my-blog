import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    )
  }
} 