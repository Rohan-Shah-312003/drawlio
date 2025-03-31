"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function JoinRoom() {
  const router = useRouter()
  const [roomId, setRoomId] = useState("")
  const [playerName, setPlayerName] = useState("")

  const handleJoinRoom = () => {
    // In a real app, we would validate the room exists on the server
    // For now, we'll just navigate to the game page with query params
    router.push(`/game/${roomId}?name=${encodeURIComponent(playerName)}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Join a Room</CardTitle>
          <CardDescription>Enter a room code to join</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="room-id">Room Code</Label>
            <Input
              id="room-id"
              placeholder="Enter 6-digit code"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              maxLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="player-name">Your Name</Label>
            <Input
              id="player-name"
              placeholder="Your nickname"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleJoinRoom}
            disabled={!roomId || !playerName || roomId.length !== 6}
          >
            Join Room
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

