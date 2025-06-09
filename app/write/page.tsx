"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { Editor } from "@/components/editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function WritePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      if (!title || !content || !categoryId) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          categoryId,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      toast({
        title: "Success",
        description: "Post created successfully",
      })

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [title, content, categoryId, router])

  return (
    <div className="container max-w-screen-lg py-10">
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <h1 className="text-3xl font-bold">Write a post</h1>
          </div>
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Publishing..." : "Publish"}
          </Button>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">개발</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="nextjs">Next.js</SelectItem>
                <SelectItem value="web">웹 개발</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Editor onChange={setContent} />
        </div>
      </div>
    </div>
  )
} 