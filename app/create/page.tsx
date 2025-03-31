"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function CreateRoom() {
  const router = useRouter()
  const [roomName, setRoomName] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [rounds, setRounds] = useState(3)
  const [drawTime, setDrawTime] = useState(80)
  const [maxPlayers, setMaxPlayers] = useState(8)
  const [category, setCategory] = useState("mixed")

  const handleCreateRoom = () => {
    // In a real app, we would create a room on the server
    // For now, we'll just navigate to the game page with query params
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()

    router.push(`/game/${roomId}?name=${encodeURIComponent(playerName)}&room=${encodeURIComponent(roomName)}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create a Room</CardTitle>
          <CardDescription>Set up your drawing room</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="room-name">Room Name</Label>
            <Input
              id="room-name"
              placeholder="My Drawing Room"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
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

          <div className="space-y-2">
            <Label htmlFor="category">Word Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mixed">Mixed (All Categories)</SelectItem>
                <SelectItem value="animals">Animals</SelectItem>
                <SelectItem value="objects">Objects</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="actions">Actions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="rounds">Rounds: {rounds}</Label>
            </div>
            <Slider
              id="rounds"
              min={1}
              max={10}
              step={1}
              value={[rounds]}
              onValueChange={(value) => setRounds(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="draw-time">Drawing Time: {drawTime}s</Label>
            </div>
            <Slider
              id="draw-time"
              min={30}
              max={180}
              step={10}
              value={[drawTime]}
              onValueChange={(value) => setDrawTime(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="max-players">Max Players: {maxPlayers}</Label>
            </div>
            <Slider
              id="max-players"
              min={2}
              max={12}
              step={1}
              value={[maxPlayers]}
              onValueChange={(value) => setMaxPlayers(value[0])}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleCreateRoom}
            disabled={!roomName || !playerName}
          >
            Create Room
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

