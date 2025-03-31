import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil } from "lucide-react"

interface Player {
  id: string
  name: string
  score: number
  isDrawing: boolean
}

interface PlayerListProps {
  players: Player[]
}

export default function PlayerList({ players }: PlayerListProps) {
  // Sort players by score (descending)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Players</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sortedPlayers.map((player) => (
            <div key={player.id} className="flex items-center justify-between rounded-lg p-2 text-sm">
              <div className="flex items-center gap-2">
                {player.isDrawing && <Pencil className="h-4 w-4 text-blue-500" />}
                <span>{player.name}</span>
              </div>
              <span className="font-bold">{player.score}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

