"use client"

import { useState, useEffect } from "react"
import { TextField, Button as MuiButton, Box, IconButton } from "@mui/material"
import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2 } from "lucide-react"

interface RichTextEditorProps {
  initialValue?: string
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({
  initialValue = "",
  value,
  onChange,
  placeholder = "Enter content...",
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialValue || value || "")
  const [isPreview, setIsPreview] = useState(false)

  // Update content when initialValue or value changes
  useEffect(() => {
    if (value !== undefined) {
      setContent(value)
    } else if (initialValue) {
      setContent(initialValue)
    }
  }, [initialValue, value])

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    onChange(newContent)
  }

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.querySelector('textarea[data-rich-editor="true"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)

    handleContentChange(newText)

    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const formatContent = (text: string) => {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^# (.*$)/gm, '<h1 style="font-size:2rem;font-weight:bold;margin-bottom:1rem;">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 style="font-size:1.5rem;font-weight:600;margin-bottom:0.75rem;">$1</h2>')
      .replace(/^> (.*$)/gm, '<blockquote style="border-left:4px solid #ccc;padding-left:1rem;font-style:italic;">$1</blockquote>')
      .replace(/^\* (.*$)/gm, "<li>$1</li>")
      .replace(/^(\d+)\. (.*$)/gm, "<li>$1. $2</li>")
      .replace(/\n/g, "<br>")
  }

  return (
    <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
      {/* Toolbar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1.5, borderBotom: 1, borderColor: "divider", bgcolor: "#fafafa" }}>
        <IconButton size="small" onClick={() => insertMarkdown("**", "**")} title="Bold">
          <Bold style={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton size="small" onClick={() => insertMarkdown("*", "*")} title="Italic">
          <Italic style={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton size="small" onClick={() => insertMarkdown("# ", "")} title="Heading 1">
          <Heading1 style={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton size="small" onClick={() => insertMarkdown("## ", "")} title="Heading 2">
          <Heading2 style={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton size="small" onClick={() => insertMarkdown("* ", "")} title="Bullet List">
          <List style={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton size="small" onClick={() => insertMarkdown("1. ", "")} title="Numbered List">
          <ListOrdered style={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton size="small" onClick={() => insertMarkdown("> ", "")} title="Quote">
          <Quote style={{ width: 18, height: 18 }} />
        </IconButton>
        <Box sx={{ flex: 1 }} />
        <MuiButton
          type="button"
          variant="outlined"
          size="small"
          onClick={() => setIsPreview(!isPreview)}
        >
          {isPreview ? "Edit" : "Preview"}
        </MuiButton>
      </Box>

      {/* Content Area */}
      <Box sx={{ minHeight: 300, p: 2 }}>
        {isPreview ? (
          <Box
            sx={{ p: 1, fontFamily: "inherit" }}
            dangerouslySetInnerHTML={{ __html: formatContent(content) }}
          />
        ) : (
          <TextField
            data-rich-editor="true"
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder={placeholder}
            multiline
            minRows={10}
            fullWidth
            variant="outlined"
            InputProps={{
              sx: { border: 0, fontFamily: "inherit" },
            }}
          />
        )}
      </Box>

      {/* Help Text */}
      <Box sx={{ p: 1.5, borderTop: 1, borderColor: "divider", bgcolor: "#fafafa", fontSize: 13, color: "text.secondary" }}>
        <strong>Formatting:</strong> **bold**, *italic*, # Heading 1, ## Heading 2, * bullet list, 1. numbered list, &gt; quote
      </Box>
    </Box>
  )
}
