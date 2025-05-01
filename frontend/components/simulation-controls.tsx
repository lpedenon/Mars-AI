"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useSimulationStore } from "@/lib/simulation-store"
import { useSimulationConfig } from "@/lib/SimulationConfig"
import type { AlgorithmType } from "@/lib/simulation-store"

export default function SimulationControls() {
  const { config, setConfig } = useSimulationConfig();

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
    // { id: "simple", name: "A* Algorithm", description: "Optimal path finding" },
    { id: "shortest-path", name: "Shortest Path", description: "Shortest path to destination"},
    { id: "hill", name: "Hill Avoidance", description: "Avoid hills if possible" },
    { id: "user", name: "User Control", description: "User can freely control the rover" },
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
          <Label>Spawn Point</Label>
          <Select
            value={config.spawnIndex.toString()}
            onValueChange={(value) =>
              setConfig({ ...config, spawnIndex: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select spawn point" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">A</SelectItem>
              <SelectItem value="1">B</SelectItem>
              <SelectItem value="2">C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Destination Point</Label>
          <Select
            value={config.destinationIndex.toString()}
            onValueChange={(value) =>
              setConfig({ ...config, destinationIndex: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select destination point" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-1">Random</SelectItem>
              <SelectItem value="0">A</SelectItem>
              <SelectItem value="1">B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Rover Brain</Label>
          {algorithms.map((algorithm) => (
            <div key={algorithm.id} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div>{algorithm.name}</div>
                <div className="text-xs text-muted-foreground">{algorithm.description}</div>
              </div>
              <Switch
                checked={config.brain === algorithm.id}
                onCheckedChange={() => setConfig({ ...config, brain: algorithm.id })}
              />
            </div>
          ))}
        </div>

        {/* <Button className="w-full" variant="outline" onClick={() => {}}>
          Generate New Terrain
        </Button> */}
      </CardContent>
    </Card>
  )
}