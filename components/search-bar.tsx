"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "검색..." }: SearchBarProps) {
  return (
    <div className="search-container">
      <Search className="search-icon" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      {value && (
        <Button variant="ghost" size="sm" className="search-clear-btn" onClick={() => onChange("")}>
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
