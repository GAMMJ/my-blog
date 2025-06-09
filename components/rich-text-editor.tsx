"use client"

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { common, createLowlight } from "lowlight"
import { Extension } from '@tiptap/core'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Type,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef, useEffect, useCallback } from "react"
import type { DragEvent as ReactDragEvent } from "react"
import { Editor } from '@tiptap/core'
import { mergeAttributes } from '@tiptap/core'
import TiptapImage from '@tiptap/extension-image'
import { cn } from "@/lib/utils"

declare module '@tiptap/extension-image' {
  interface ImageOptions {
    HTMLAttributes: Record<string, any>
  }
}

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

interface CustomImageAttributes {
  src: string
  alt?: string
  title?: string
  width?: number | null
  height?: number | null
}

const lowlight = createLowlight(common)

const ResizableImage = Image.extend({
  name: 'resizableImage',
  
  defaultOptions: {
    ...Image.options,
    HTMLAttributes: {
      class: 'resize-image',
    },
  },

  renderHTML({ HTMLAttributes }) {
    const { style, ...attrs } = HTMLAttributes
    return ['img', { ...attrs, style: `${style || ''}` }]
  },
})

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [startSize, setStartSize] = useState({ width: 0, height: 0 })
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full",
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      setIsUploading(true)
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
      
      if (data.url && editor) {
        // 이미지 원본 크기 가져오기
        const img = document.createElement('img')
        img.src = data.url
        img.onload = () => {
          editor
            .chain()
            .focus()
            .insertContent({
              type: 'image',
              attrs: {
                src: data.url,
                style: `width: ${img.naturalWidth}px; height: ${img.naturalHeight}px;`
              }
            })
            .run()
        }
      }
    } catch (error) {
      console.error("Image upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }, [editor])

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    
    if (!items) return

    Array.from(items).forEach(item => {
      if (item.type.startsWith('image/')) {
        e.preventDefault()
        const file = item.getAsFile()
        if (file) {
          handleImageUpload(file)
        }
      }
    })
  }, [handleImageUpload])

  const handleDocumentDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    
    const files = e.dataTransfer?.files
    if (!files) return

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        handleImageUpload(file)
      }
    })
  }, [handleImageUpload])

  const handleDocumentDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e: ReactDragEvent<HTMLDivElement>) => {
    e.preventDefault()
    
    const files = e.dataTransfer?.files
    if (!files) return

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        handleImageUpload(file)
      }
    })
  }, [handleImageUpload])

  const handleDragOver = useCallback((e: ReactDragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      editor
        .chain()
        .focus()
        .setLink({ href: linkUrl })
        .run()
      setLinkUrl("")
      setShowLinkInput(false)
    }
  }, [editor, linkUrl])

  const handleImageClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.tagName === 'IMG') {
      const img = target as HTMLImageElement
      setSelectedImage(img)
      setStartSize({
        width: img.width || img.naturalWidth,
        height: img.height || img.naturalHeight,
      })
    } else if (!target.closest('.image-wrapper')) {
      setSelectedImage(null)
    }
  }, [])

  const updateImageSize = useCallback((newWidth: number, newHeight: number) => {
    if (!editor || !selectedImage) return

    // 이미지 크기 업데이트
    const newStyle = `width: ${newWidth}px; height: ${newHeight}px;`
    selectedImage.style.cssText = newStyle

    // 상태 업데이트
    setStartSize({ width: newWidth, height: newHeight })
  }, [editor, selectedImage])

  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    if (!selectedImage) return

    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setStartPosition({ x: e.clientX, y: e.clientY })
  }, [selectedImage])

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !selectedImage) return

    const deltaX = e.clientX - startPosition.x
    const deltaY = e.clientY - startPosition.y
    const direction = (e.target as HTMLElement)?.getAttribute('data-direction') || ''

    let newWidth = startSize.width
    let newHeight = startSize.height

    switch (direction) {
      case 'se':
        newWidth = startSize.width + deltaX
        newHeight = startSize.height + deltaY
        break
      case 'sw':
        newWidth = startSize.width - deltaX
        newHeight = startSize.height + deltaY
        break
      case 'ne':
        newWidth = startSize.width + deltaX
        newHeight = startSize.height - deltaY
        break
      case 'nw':
        newWidth = startSize.width - deltaX
        newHeight = startSize.height - deltaY
        break
      case 'e':
        newWidth = startSize.width + deltaX
        break
      case 'w':
        newWidth = startSize.width - deltaX
        break
      case 'n':
        newHeight = startSize.height - deltaY
        break
      case 's':
        newHeight = startSize.height + deltaY
        break
    }

    // 최소 크기 제한
    newWidth = Math.max(20, newWidth)
    newHeight = Math.max(20, newHeight)

    updateImageSize(newWidth, newHeight)
  }, [isResizing, selectedImage, startPosition.x, startPosition.y, startSize.width, startSize.height, updateImageSize])

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false)
  }, [])

  useEffect(() => {
    document.addEventListener('paste', handlePaste)
    document.addEventListener('drop', handleDocumentDrop)
    document.addEventListener('dragover', handleDocumentDragOver)
    document.addEventListener('click', handleImageClick)
    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', handleResizeEnd)

    return () => {
      document.removeEventListener('paste', handlePaste)
      document.removeEventListener('drop', handleDocumentDrop)
      document.removeEventListener('dragover', handleDocumentDragOver)
      document.removeEventListener('click', handleImageClick)
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
    }
  }, [handlePaste, handleDocumentDrop, handleDocumentDragOver, handleImageClick, handleResizeMove, handleResizeEnd])

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-lg overflow-hidden dark:border-gray-800">
      <style jsx global>{`
        .resize-image {
          display: inline-block;
          max-width: 100%;
          height: auto;
        }
        .resize-handle {
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: white;
          border: 2px solid #0ea5e9;
          border-radius: 50%;
          z-index: 100;
        }
        .resize-handle:hover {
          background-color: #0ea5e9;
        }
        .resize-handle.nw { top: -6px; left: -6px; cursor: nw-resize; }
        .resize-handle.n { top: -6px; left: 50%; transform: translateX(-50%); cursor: n-resize; }
        .resize-handle.ne { top: -6px; right: -6px; cursor: ne-resize; }
        .resize-handle.e { top: 50%; right: -6px; transform: translateY(-50%); cursor: e-resize; }
        .resize-handle.se { bottom: -6px; right: -6px; cursor: se-resize; }
        .resize-handle.s { bottom: -6px; left: 50%; transform: translateX(-50%); cursor: s-resize; }
        .resize-handle.sw { bottom: -6px; left: -6px; cursor: sw-resize; }
        .resize-handle.w { top: 50%; left: -6px; transform: translateY(-50%); cursor: w-resize; }
        .image-wrapper {
          position: absolute;
          pointer-events: none;
        }
        .image-wrapper .resize-handle {
          pointer-events: all;
        }
      `}</style>
      <div 
        className="relative" 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="bg-muted/50 p-2 border-b dark:border-gray-800 flex flex-wrap gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(editor.isActive("bold") && "bg-muted")}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(editor.isActive("italic") && "bg-muted")}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn(editor.isActive("strike") && "bg-muted")}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={cn(editor.isActive("code") && "bg-muted")}
          >
            <Code className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(editor.isActive("heading", { level: 1 }) && "bg-muted")}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(editor.isActive("heading", { level: 2 }) && "bg-muted")}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={cn(editor.isActive("heading", { level: 3 }) && "bg-muted")}
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(editor.isActive("bulletList") && "bg-muted")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(editor.isActive("orderedList") && "bg-muted")}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cn(editor.isActive("blockquote") && "bg-muted")}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLinkInput(!showLinkInput)}
              className={cn(editor.isActive("link") && "bg-muted")}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            {showLinkInput && (
              <div className="absolute top-full left-0 mt-1 bg-background border rounded-lg p-2 z-10 flex gap-2 dark:border-gray-800">
                <Input
                  type="url"
                  placeholder="URL 입력"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-64"
                />
                <Button size="sm" onClick={addLink}>
                  추가
                </Button>
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  handleImageUpload(file)
                }
              }}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImageIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <EditorContent 
            editor={editor} 
            className={cn(
              "prose prose-sm max-w-none p-4",
              "dark:prose-invert",
              "prose-headings:font-bold prose-headings:tracking-tight",
              "prose-p:leading-7",
              "prose-pre:rounded-lg",
              "prose-code:rounded-md prose-code:bg-muted prose-code:px-1 prose-code:py-0.5",
              "prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700",
              "prose-img:rounded-lg"
            )}
          />
          {selectedImage && (
            <div
              ref={imageWrapperRef}
              className="image-wrapper"
              style={{
                left: selectedImage.offsetLeft,
                top: selectedImage.offsetTop,
                width: selectedImage.offsetWidth,
                height: selectedImage.offsetHeight,
              }}
            >
              <div className="resize-handle nw" data-direction="nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
              <div className="resize-handle n" data-direction="n" onMouseDown={(e) => handleResizeStart(e, 'n')} />
              <div className="resize-handle ne" data-direction="ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
              <div className="resize-handle e" data-direction="e" onMouseDown={(e) => handleResizeStart(e, 'e')} />
              <div className="resize-handle se" data-direction="se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
              <div className="resize-handle s" data-direction="s" onMouseDown={(e) => handleResizeStart(e, 's')} />
              <div className="resize-handle sw" data-direction="sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
              <div className="resize-handle w" data-direction="w" onMouseDown={(e) => handleResizeStart(e, 'w')} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 