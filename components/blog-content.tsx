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

  const copyToClipboard = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // 마크다운을 HTML로 변환하는 간단한 파서
  const parseMarkdown = (markdown: string) => {
    let html = markdown

    // 헤딩 처리
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>")
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>")
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>")

    // 코드 블록 처리
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
      const lang = language || "text"
      const trimmedCode = code.trim()
      return `<pre data-language="${lang}" data-code="${encodeURIComponent(trimmedCode)}"><code>${trimmedCode}</code></pre>`
    })

    // 인라인 코드 처리
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

    // 이미지 처리
    html = html.replace(/!\[([^\]]*)\]$$([^)]+)$$/g, (match, alt, src) => {
      return `<img src="${src}" alt="${alt}" />`
    })

    // 링크 처리
    html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2">$1</a>')

    // 볼드 처리
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // 이탤릭 처리
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")

    // 인용구 처리
    html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")

    // 리스트 처리
    html = html.replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
    html = html.replace(/^- (.*$)/gim, "<li>$1</li>")

    // 테이블 처리 (간단한 버전)
    html = html.replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split("|").map((cell: string) => cell.trim())
      return "<tr>" + cells.map((cell: string) => `<td>${cell}</td>`).join("") + "</tr>"
    })

    // 비디오 태그 처리
    html = html.replace(/<video([^>]*)>/g, "<video$1>")

    // 단락 처리
    html = html.replace(/\n\n/g, "</p><p>")
    html = "<p>" + html + "</p>"

    return html
  }

  const renderContent = () => {
    const sections = content.split(/(```[\w]*\n[\s\S]*?```)/g)

    return sections.map((section, index) => {
      // 코드 블록인지 확인
      const codeMatch = section.match(/```(\w+)?\n([\s\S]*?)```/)

      if (codeMatch) {
        const language = codeMatch[1] || "text"
        const code = codeMatch[2].trim()

        return (
          <div key={index} className="code-block-container">
            <div className="code-block-header">
              <span className="code-block-language">{language}</span>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(code)} className="code-block-copy-btn">
                {copiedCode === code ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <SyntaxHighlighter
              language={language}
              style={theme === "dark" ? oneDark : oneLight}
              customStyle={{
                margin: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: "0.5rem",
                borderBottomRightRadius: "0.5rem",
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        )
      }

      // 일반 마크다운 텍스트 처리
      return <div key={index} dangerouslySetInnerHTML={{ __html: parseMarkdown(section) }} className="blog-content" />
    })
  }

  return <div className="blog-content">{renderContent()}</div>
}
