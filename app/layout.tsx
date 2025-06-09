import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevBlog - 개발자의 성장 이야기",
  description: "웹 개발, 프로그래밍, 그리고 기술에 대한 깊이 있는 인사이트를 공유합니다.",
  keywords: ["개발", "프로그래밍", "웹개발", "블로그", "기술"],
  authors: [{ name: "김민재" }],
  creator: "김민재",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://your-blog-url.vercel.app",
    title: "DevBlog - 개발자의 성장 이야기",
    description: "웹 개발, 프로그래밍, 그리고 기술에 대한 깊이 있는 인사이트를 공유합니다.",
    siteName: "DevBlog",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevBlog - 개발자의 성장 이야기",
    description: "웹 개발, 프로그래밍, 그리고 기술에 대한 깊이 있는 인사이트를 공유합니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
