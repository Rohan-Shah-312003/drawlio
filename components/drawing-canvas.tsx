"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, Rect, PencilBrush, IText, Circle} from "fabric"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Square, Trash2, Eraser, Pencil, Type } from "lucide-react"

interface DrawingCanvasProps {
  isDrawing: boolean
  currentWord: string
}

export default function DrawingCanvas({ isDrawing, currentWord }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<Canvas | null>(null)
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState("#000000")
  const [tool, setTool] = useState<"brush" | "eraser" | "circle" | "rectangle" | "text">("brush")

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: canvasRef.current.parentElement?.clientWidth || 800,
      height: 600,
      backgroundColor: "white",
    })

    fabricCanvasRef.current = canvas

    // Set up brush
    canvas.freeDrawingBrush = new PencilBrush(canvas)
    canvas.freeDrawingBrush.width = brushSize
    canvas.freeDrawingBrush.color = brushColor

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current || !fabricCanvasRef.current) return

      const width = canvasRef.current.parentElement?.clientWidth || 800
      fabricCanvasRef.current.setWidth(width)
      fabricCanvasRef.current.renderAll()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      canvas.dispose()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Update brush size
  useEffect(() => {
    if (!fabricCanvasRef.current) return

    fabricCanvasRef.current.freeDrawingBrush.width = brushSize
  }, [brushSize])

  // Update brush color
  useEffect(() => {
    if (!fabricCanvasRef.current) return

    fabricCanvasRef.current.freeDrawingBrush.color = brushColor
  }, [brushColor])

  // Update drawing mode based on isDrawing prop
  useEffect(() => {
    if (!fabricCanvasRef.current) return

    fabricCanvasRef.current.isDrawingMode = isDrawing
  }, [isDrawing])

  // Update tool
  useEffect(() => {
    if (!fabricCanvasRef.current) return

    const canvas = fabricCanvasRef.current

    if (tool === "brush") {
      canvas.isDrawingMode = true
      canvas.freeDrawingBrush = new PencilBrush(canvas)
      canvas.freeDrawingBrush.width = brushSize
      canvas.freeDrawingBrush.color = brushColor
    } else if (tool === "eraser") {
      canvas.isDrawingMode = true
      canvas.freeDrawingBrush = new PencilBrush(canvas)
      canvas.freeDrawingBrush.width = brushSize
      canvas.freeDrawingBrush.color = "#FFFFFF"
    } else {
      canvas.isDrawingMode = false
    }
  }, [tool, brushSize, brushColor])

  const handleClear = () => {
    if (!fabricCanvasRef.current) return

    fabricCanvasRef.current.clear()
    fabricCanvasRef.current.backgroundColor = "white"
    fabricCanvasRef.current.renderAll()
  }

  const handleAddShape = (shape: "circle" | "rectangle") => {
    if (!fabricCanvasRef.current) return

    const canvas = fabricCanvasRef.current

    if (shape === "circle") {
      const circle = new Circle({
        radius: 50,
        fill: brushColor,
        left: canvas.width! / 2 - 50,
        top: canvas.height! / 2 - 50,
      })

      canvas.add(circle)
      canvas.setActiveObject(circle)
    } else if (shape === "rectangle") {
      const rect = new Rect({
        width: 100,
        height: 100,
        fill: brushColor,
        left: canvas.width! / 2 - 50,
        top: canvas.height! / 2 - 50,
      })

      canvas.add(rect)
      canvas.setActiveObject(rect)
    }
  }

  const handleAddText = () => {
    if (!fabricCanvasRef.current) return

    const canvas = fabricCanvasRef.current

    const text = new IText("Text", {
      left: canvas.width! / 2,
      top: canvas.height! / 2,
      fontFamily: "Arial",
      fill: brushColor,
      fontSize: 30,
    })

    canvas.add(text)
    canvas.setActiveObject(text)
  }

  const colors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
  ]

  return (
    <div className="flex h-full flex-col">
      {isDrawing && <div className="mb-2 text-center font-bold">Drawing: {currentWord}</div>}

      {!isDrawing && currentWord && (
        <div className="mb-2 text-center">
          {currentWord.split("").map((char, i) => (
            <span
              key={i}
              className="mx-1 inline-block h-8 w-6 border-b-2 border-gray-400 text-center text-xl font-bold"
            >
              {char}
            </span>
          ))}
        </div>
      )}

      <div className="relative flex-1">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>

      {isDrawing && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex gap-1">
            <Button
              variant={tool === "brush" ? "default" : "outline"}
              size="icon"
              onClick={() => setTool("brush")}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant={tool === "eraser" ? "default" : "outline"}
              size="icon"
              onClick={() => setTool("eraser")}
              className="h-8 w-8"
            >
              <Eraser className="h-4 w-4" />
            </Button>
            <Button
              variant={tool === "circle" ? "default" : "outline"}
              size="icon"
              onClick={() => {
                setTool("circle")
                handleAddShape("circle")
              }}
              className="h-8 w-8"
            >
              <Circle className="h-4 w-4" />
            </Button>
            <Button
              variant={tool === "rectangle" ? "default" : "outline"}
              size="icon"
              onClick={() => {
                setTool("rectangle")
                handleAddShape("rectangle")
              }}
              className="h-8 w-8"
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant={tool === "text" ? "default" : "outline"}
              size="icon"
              onClick={() => {
                setTool("text")
                handleAddText()
              }}
              className="h-8 w-8"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleClear} className="h-8 w-8">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="ml-2 flex items-center gap-2">
            <span className="text-xs">Size:</span>
            <Slider
              value={[brushSize]}
              min={1}
              max={50}
              step={1}
              className="w-24"
              onValueChange={(value) => setBrushSize(value[0])}
            />
          </div>

          <div className="ml-2 flex flex-wrap gap-1">
            {colors.map((color) => (
              <button
                key={color}
                className={`h-6 w-6 rounded-full border ${
                  brushColor === color ? "ring-2 ring-blue-500 ring-offset-2" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setBrushColor(color)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

