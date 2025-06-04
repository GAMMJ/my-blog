import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicPaths = ["/", "/blog(.*)", "/api/posts"]

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  )
}

export default authMiddleware({
  publicRoutes: ["/", "/blog(.*)", "/api/posts", "/sign-in", "/sign-up"]
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
} 