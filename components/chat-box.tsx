"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ChatBoxProps {
  messages: Array<{
    id: string
    player: string
    text: string
    isGuess?: boolean
    isCorrect?: boolean
  }>
  onSendMessage: (text: string) => void
  disabled?: boolean
}

export default function ChatBox({ messages, onSendMessage, disabled }: ChatBoxProps) {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || disabled) return

    onSendMessage(message.trim())
    setMessage("")
  }

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <Card className="flex h-[400px] flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className="rounded-lg p-2 text-sm">
              <span className="font-bold">{msg.player}: </span>
              <span className={msg.isGuess && msg.isCorrect ? "text-green-600 font-semibold" : ""}>{msg.text}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder={disabled ? "You are drawing..." : "Type your guess..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
          />
          <Button type="submit" size="icon" disabled={disabled || !message.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

