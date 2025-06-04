import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await req.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 파일 이름에 타임스탬프 추가하여 중복 방지
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name}`
    
    // public/uploads 디렉토리에 저장
    const path = join(process.cwd(), "public/uploads", fileName)
    await writeFile(path, buffer)

    // 이미지 URL 반환
    const imageUrl = `/uploads/${fileName}`
    
    return NextResponse.json({ url: imageUrl })
  } catch (error) {
    console.error("[UPLOAD]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 