"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RichTextEditor } from "@/components/rich-text-editor"

const categories = [
  { id: "dev", name: "개발" },
  { id: "react", name: "React" },
  { id: "typescript", name: "TypeScript" },
  { id: "performance", name: "성능" },
  { id: "css", name: "CSS" },
  { id: "javascript", name: "JavaScript" },
]

export default function WritePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      setFeaturedImage(data.url)
    } catch (error) {
      console.error("Image upload error:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content || !category) return

    try {
      setIsSubmitting(true)

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          categoryId: category,
          featuredImage,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create post")
      }

      const data = await response.json()
      router.push(`/blog/${data.id}`)
    } catch (error) {
      console.error("Failed to create post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-8">새 글 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            제목
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">카테고리</label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">대표 이미지</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                handleImageUpload(file)
              }
            }}
          />
          {featuredImage && (
            <div className="aspect-video relative mt-2 rounded-lg overflow-hidden">
              <img
                src={featuredImage}
                alt="Featured"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">내용</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </div>
      </form>
    </div>
  )
} 