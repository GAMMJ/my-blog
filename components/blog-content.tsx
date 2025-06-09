"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "next-themes"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const { theme } = useTheme()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const processContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    let lastIndex = 0
    const parts = []
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        })
      }

      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trim()
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      })
    }

    return parts
  }

  const handleCopyCode = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const contentParts = processContent(content)

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {contentParts.map((part, index) => {
        if (part.type === 'code') {
          return (
            <div key={index} className="relative my-6 rounded-lg overflow-hidden border border-[hsl(var(--code-border))]">
              <div className="flex items-center justify-between bg-[hsl(var(--code-header))] px-4 py-2 border-b border-[hsl(var(--code-border))]">
                <span className="text-sm font-medium text-muted-foreground">
                  {part.language}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleCopyCode(part.content)}
                >
                  {copiedCode === part.content ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <SyntaxHighlighter
                language={part.language}
                style={theme === 'dark' ? oneDark : oneLight}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: 'hsl(var(--code-bg))',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                }}
              >
                {part.content}
              </SyntaxHighlighter>
            </div>
          )
        }
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: part.content }}
          />
        )
      })}
    </div>
  )
}
