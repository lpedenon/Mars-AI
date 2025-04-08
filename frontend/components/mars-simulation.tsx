"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Maximize2, Minimize2, Play } from "lucide-react"
import Image from "next/image"
import { useSimulationStore } from "@/lib/simulation-store"
import { useRouter } from "next/navigation"

const terrainImages = {
  // highlands: "/images/mars-surface.jpg",
  highlands: "/images/mars-texture.png",
  valles: "/images/valles-marineris.jpg",
  olympus: "/images/olympus-mons.jpg",
}

export default function MarsSimulation() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lineProgressRef = useRef(0)
  const { terrainType } = useSimulationStore()
  const router = useRouter()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match container
    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (!container) return
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isRunning || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      // Clear previous frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw line
      ctx.beginPath()
      ctx.strokeStyle = '#FF5722' // Orange color for visibility
      ctx.lineWidth = 3
      
      // Draw from left to right
      const startX = canvas.width * 0.1
      const endX = canvas.width * 0.9
      const y = canvas.height * 0.5
      
      const currentX = startX + (endX - startX) * lineProgressRef.current
      ctx.moveTo(startX, y)
      ctx.lineTo(currentX, y)
      ctx.stroke()

      // Update progress
      lineProgressRef.current += 0.01
      
      if (lineProgressRef.current < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setIsRunning(false)
      }
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRunning])

  const toggleFullscreen = () => {
    const container = document.querySelector(".simulation-container")

    if (!document.fullscreenElement) {
      container?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleRun = () => {
    router.push('/simulation')
  }

  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-full w-full">
          <div className="simulation-container relative h-[500px] w-full lg:h-[600px]">
            <Image
              src={terrainImages[terrainType as keyof typeof terrainImages]}
              alt={`${terrainType} Surface`}
              fill
              className="object-cover"
              priority
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0"
              style={{ pointerEvents: 'none' }}
            />
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button variant="secondary" size="icon" onClick={handleRun}>
              <Play size={18} />
            </Button>
            <Button variant="secondary" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </Button>
          </div>

          <div className="absolute left-4 top-4 rounded bg-black/50 px-3 py-1 text-sm text-white">
            {terrainType.charAt(0).toUpperCase() + terrainType.slice(1)} Surface View
          </div>
        </div>
      </CardContent>
    </Card>
  )
}