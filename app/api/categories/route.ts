import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error("[CATEGORIES_GET]", error)
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { name } = json

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("[CATEGORY_CREATE]", error)
    return NextResponse.json(
      { error: "Error creating category" },
      { status: 500 }
    )
  }
} 