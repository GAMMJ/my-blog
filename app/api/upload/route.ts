import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { cookies } from "next/headers"

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
    const formData = await request.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 파일 이름에 타임스탬프 추가하여 중복 방지
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const path = join(process.cwd(), "public/uploads", filename)

    await writeFile(path, buffer)

    return NextResponse.json({ 
      url: `/uploads/${filename}`,
      message: "File uploaded successfully" 
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
} 