import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PointerIcon as Hint, SkipForward } from "lucide-react"

interface GameControlsProps {
  isDrawing: boolean
}

export default function GameControls({ isDrawing }: GameControlsProps) {
  if (!isDrawing) return null

  return (
    <Card>
      <CardContent className="flex items-center justify-center gap-4 p-4">
        <Button variant="outline" className="gap-2">
          <Hint className="h-4 w-4" />
          Give Hint
        </Button>
        <Button variant="outline" className="gap-2">
          <SkipForward className="h-4 w-4" />
          Skip Word
        </Button>
      </CardContent>
    </Card>
  )
}

