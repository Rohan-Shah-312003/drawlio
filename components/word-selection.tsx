"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WordSelectionProps {
  words: string[]
  onSelect: (word: string) => void
}

export default function WordSelection({ words, onSelect }: WordSelectionProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Choose a word to draw</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {words.map((word) => (
            <Button key={word} variant="outline" className="py-6 text-lg font-medium" onClick={() => onSelect(word)}>
              {word}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

