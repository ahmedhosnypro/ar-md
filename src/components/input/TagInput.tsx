"use client"

import type React from "react"
import { useState, useRef, type KeyboardEvent, type MouseEvent, useEffect } from "react"
import { Box, Chip, Typography, Paper, InputBase, styled, useTheme } from "@mui/material"

interface TagInputProps {
  readonly label?: string
  readonly placeholder?: string
  readonly onChange?: (tags: string[]) => void
  readonly initialTags?: string[]
}

const TagContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  padding: theme.spacing(1),
  minHeight: "56px",
  alignItems: "flex-start",
  cursor: "text",
  border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.23)" : "rgba(0, 0, 0, 0.23)"}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
  transition: theme.transitions.create(["border-color", "box-shadow"]),
  "&:focus-within": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}${theme.palette.mode === "dark" ? "40" : "20"}`,
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  fontSize: 16,
  padding: theme.spacing(0.5),
  minWidth: "120px",
  height: "32px",
}))

const ChipEditInput = styled(InputBase)(({ theme }) => ({
  fontSize: 14,
  padding: theme.spacing(0.25, 0.5),
  margin: theme.spacing(0.5),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  width: "auto",
  minWidth: "60px",
  height: "24px",
}))

export default function TagInput({
  label = "Add items",
  placeholder = "Type and press Enter",
  onChange,
  initialTags = [],
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [inputValue, setInputValue] = useState("")
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const editInputRef = useRef<HTMLInputElement>(null)
  const theme = useTheme()

  useEffect(() => {
    if (onChange) {
      onChange(tags)
    }
  }, [tags, onChange])

  useEffect(() => {
    if (editingIndex !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingIndex])

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value)
  }

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setInputValue("")
    }
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue) {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      e.preventDefault()
      const lastTag = tags[tags.length - 1]
      setTags(tags.slice(0, -1))
      setInputValue(lastTag)
    }
  }

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault()
      updateTag(index)
    } else if (e.key === "Escape") {
      e.preventDefault()
      cancelEdit()
    }
  }

  const handleChipDoubleClick = (index: number) => {
    setEditingIndex(index)
    setEditingValue(tags[index])
  }

  const updateTag = (index: number) => {
    const trimmedValue = editingValue.trim()
    if (trimmedValue && !tags.includes(trimmedValue)) {
      const newTags = [...tags]
      newTags[index] = trimmedValue
      setTags(newTags)
    }
    cancelEdit()
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditingValue("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleDelete = (index: number) => (e: MouseEvent) => {
    e.stopPropagation()
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Only add tag on blur if there's a value and we're not clicking inside the container
    if (inputValue && !containerRef.current?.contains(e.relatedTarget as Node)) {
      addTag(inputValue)
    }
  }

  const handleEditBlur = (index: number) => {
    updateTag(index)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
      >
        {label}
      </Typography>

      <TagContainer ref={containerRef} onClick={handleContainerClick} elevation={0}>
        {tags.map((tag, index) =>
          editingIndex === index ? (
            <ChipEditInput
              key={`editing-${tag}-${index}`}
              inputRef={editInputRef}
              value={editingValue}
              onChange={handleEditInputChange}
              onKeyDown={(e) => handleEditKeyDown(e, index)}
              onBlur={() => handleEditBlur(index)}
              autoFocus
            />
          ) : (
            <Chip
              key={`${tag}-${index}`}
              label={tag}
              onDelete={handleDelete(index)}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => handleChipDoubleClick(index)}
              size="small"
              sx={{
                m: 0.5,
                transition: "all 0.2s ease",
                animation: "fadeIn 0.3s",
                "@keyframes fadeIn": {
                  "0%": {
                    opacity: 0,
                    transform: "scale(0.9)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "scale(1)",
                  },
                },
              }}
            />
          ),
        )}
        <StyledInputBase
          inputRef={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleBlur}
          placeholder={tags.length === 0 ? placeholder : ""}
          sx={{
            margin: 0.5,
            flexGrow: 1,
          }}
        />
      </TagContainer>
    </Box>
  )
}
