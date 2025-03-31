"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import DrawingCanvas from "@/components/drawing-canvas"
import ChatBox from "@/components/chat-box"
import PlayerList from "@/components/player-list"
import GameControls from "@/components/game-controls"
import WordSelection from "@/components/word-selection"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

// Mock data for development
const MOCK_PLAYERS = [
  { id: "1", name: "Player 1", score: 0, isDrawing: true },
  { id: "2", name: "Player 2", score: 0, isDrawing: false },
  { id: "3", name: "Player 3", score: 0, isDrawing: false },
]

const MOCK_WORDS = ["apple", "banana", "car", "dog", "elephant"]

export default function GameRoom() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const roomId = params.roomId as string
  const playerName = searchParams.get("name") || "Guest"
  const roomName = searchParams.get("room") || `Room ${roomId}`

  const [players, setPlayers] = useState(MOCK_PLAYERS)
  const [messages, setMessages] = useState<
    Array<{ id: string; player: string; text: string; isGuess?: boolean; isCorrect?: boolean }>
  >([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentWord, setCurrentWord] = useState("")
  const [selectingWord, setSelectingWord] = useState(false)
  const [timeLeft, setTimeLeft] = useState(80)
  const [gameStarted, setGameStarted] = useState(false)

  // Mock socket connection
  useEffect(() => {
    toast({
      title: "Connected to room",
      description: `You joined ${roomName} as ${playerName}`,
    })

    // In a real app, we would connect to a WebSocket here

    return () => {
      // Cleanup socket connection
    }
  }, [roomId, playerName, roomName, toast])

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      player: playerName,
      text,
      isGuess: true,
      isCorrect: currentWord && text.toLowerCase().includes(currentWord.toLowerCase()),
    }

    setMessages((prev) => [...prev, newMessage])

    if (newMessage.isCorrect) {
      toast({
        title: "Correct guess!",
        description: `${playerName} guessed the word!`,
      })
    }
  }

  const handleWordSelect = (word: string) => {
    setCurrentWord(word)
    setSelectingWord(false)
    setIsDrawing(true)

    toast({
      title: "Your turn to draw",
      description: `You are drawing: ${word}`,
    })
  }

  const startGame = () => {
    setGameStarted(true)
    setSelectingWord(true)
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Drawlio</h1>
          <p className="text-sm text-gray-600">
            Room: {roomName} ({roomId})
          </p>
        </div>
        <div className="flex items-center gap-4">
          {!gameStarted && (
            <Button onClick={startGame} className="bg-blue-600 hover:bg-blue-700">
              Start Game
            </Button>
          )}
          {gameStarted && (
            <div className="rounded-full bg-white px-4 py-2 font-mono text-lg font-bold">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </div>
          )}
        </div>
      </div>

      {selectingWord && <WordSelection words={MOCK_WORDS} onSelect={handleWordSelect} />}

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-4">
          <Card className="flex-1 overflow-hidden p-4">
            <DrawingCanvas isDrawing={isDrawing} currentWord={currentWord} />
          </Card>

          <GameControls isDrawing={isDrawing} />
        </div>

        <div className="flex flex-col gap-4">
          <PlayerList players={players} />
          <ChatBox messages={messages} onSendMessage={handleSendMessage} disabled={isDrawing} />
        </div>
      </div>
    </div>
  )
}

