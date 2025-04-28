"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSimulationStore } from "@/lib/simulation-store"

type AlgorithmType = "a-star" | "dijkstra" | "hill-avoidance" | "neural"

type AlgorithmMetrics = {
  pathLength: string
  executionTime: string
  memoryUsage: string
  optimality: string
  adaptability: string
}

type AlgorithmMetricsMap = {
  [K in AlgorithmType]: AlgorithmMetrics
}

export default function AIComparisonPanel() {
  const { selectedAlgorithms, isRunning } = useSimulationStore()

  // Simulated performance metrics for each algorithm
  const algorithmMetrics: AlgorithmMetricsMap = {
    "a-star": {
      pathLength: "342m",
      executionTime: "0.8s",
      memoryUsage: "Low",
      optimality: "High",
      adaptability: "Medium",
    },
    dijkstra: {
      pathLength: "356m",
      executionTime: "1.2s",
      memoryUsage: "Medium",
      optimality: "High",
      adaptability: "Low",
    },
    "hill-avoidance": {
      pathLength: "389m",
      executionTime: "0.5s",
      memoryUsage: "Low",
      optimality: "Medium",
      adaptability: "High",
    },
    neural: {
      pathLength: "361m",
      executionTime: "0.3s",
      memoryUsage: "High",
      optimality: "Medium",
      adaptability: "Very High",
    },
  }

  const activeAlgorithms = selectedAlgorithms.filter((algo: string): algo is AlgorithmType => 
    Object.keys(algorithmMetrics).includes(algo)
  )

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>AI Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        {activeAlgorithms.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Metric</TableHead>
                {activeAlgorithms.map((algo: AlgorithmType) => (
                  <TableHead key={algo} className="text-center">
                    {algo.toUpperCase()}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries({
                "Path Length": "pathLength",
                "Execution Time": "executionTime",
                "Memory Usage": "memoryUsage",
                Optimality: "optimality",
                Adaptability: "adaptability",
              }).map(([label, metric]) => (
                <TableRow key={metric}>
                  <TableCell className="font-medium">{label}</TableCell>
                  {activeAlgorithms.map((algo: AlgorithmType) => (
                    <TableCell key={`${algo}-${metric}`} className="text-center">
                      {
                        algorithmMetrics[algo as keyof typeof algorithmMetrics][
                          metric as keyof (typeof algorithmMetrics)["a-star"]
                        ]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex h-[200px] items-center justify-center text-center text-muted-foreground">
            <div>
              <p>No algorithms selected</p>
              <p className="text-sm">Select at least one algorithm to see comparison data</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}