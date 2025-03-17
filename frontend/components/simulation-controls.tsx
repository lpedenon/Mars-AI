"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useSimulationStore } from "@/lib/simulation-store"

export default function SimulationControls() {
  const {
    aiComplexity,
    simulationSpeed,
    selectedAlgorithms,
    terrainType,
    setAiComplexity,
    setSimulationSpeed,
    toggleAlgorithm,
    setTerrainType,
  } = useSimulationStore()

  const algorithms = [
    { id: "a-star", name: "A* Algorithm", description: "Optimal path finding" },
    { id: "dijkstra", name: "Dijkstra's", description: "Shortest path algorithm" },
    { id: "rrt", name: "RRT", description: "Rapidly-exploring random tree" },
    { id: "neural", name: "Neural Network", description: "Learning-based navigation" },
  ]

  const terrainTypes = [
    { value: "highlands", label: "Martian Highlands" },
    { value: "valles", label: "Valles Marineris" },
    { value: "olympus", label: "Olympus Mons" },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Simulation Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-complexity">AI Complexity</Label>
            <span className="text-xs text-muted-foreground">{Math.round(aiComplexity * 100)}%</span>
          </div>
          <Slider
            id="ai-complexity"
            min={0.1}
            max={1}
            step={0.1}
            value={[aiComplexity]}
            onValueChange={(value) => setAiComplexity(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="simulation-speed">Simulation Speed</Label>
            <span className="text-xs text-muted-foreground">{Math.round(simulationSpeed * 100)}%</span>
          </div>
          <Slider
            id="simulation-speed"
            min={0.1}
            max={1}
            step={0.1}
            value={[simulationSpeed]}
            onValueChange={(value) => setSimulationSpeed(value[0])}
          />
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Select value={terrainType} onValueChange={setTerrainType}>
            <SelectTrigger>
              <SelectValue placeholder="Select terrain type" />
            </SelectTrigger>
            <SelectContent>
              {terrainTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>AI Algorithms</Label>
          {algorithms.map((algorithm) => (
            <div key={algorithm.id} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div>{algorithm.name}</div>
                <div className="text-xs text-muted-foreground">{algorithm.description}</div>
              </div>
              <Switch
                checked={selectedAlgorithms.includes(algorithm.id as "a-star" | "dijkstra" | "rrt" | "neural")}
                onCheckedChange={() => toggleAlgorithm(algorithm.id as "a-star" | "dijkstra" | "rrt" | "neural")}
              />
            </div>
          ))}
        </div>

        <Button className="w-full" variant="outline" onClick={() => {}}>
          Generate New Terrain
        </Button>
      </CardContent>
    </Card>
  )
}