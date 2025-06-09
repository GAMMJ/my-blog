"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenLine } from "lucide-react"

export function WriteButton() {
  return (
    <Button asChild>
      <Link href="/write" className="flex items-center gap-2">
        <PenLine className="h-4 w-4" />
        Write
      </Link>
    </Button>
  )
} 