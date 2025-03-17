"use client"

import { create } from "zustand"
import { type StateCreator } from "zustand"

type AlgorithmType = "a-star" | "dijkstra" | "rrt" | "neural"

interface SimulationState {
  isRunning: boolean
  aiComplexity: number
  simulationSpeed: number
  selectedAlgorithms: AlgorithmType[]
  terrainType: string

  toggleSimulation: () => void
  resetSimulation: () => void
  setAiComplexity: (value: number) => void
  setSimulationSpeed: (value: number) => void
  toggleAlgorithm: (algorithmId: AlgorithmType) => void
  setTerrainType: (type: string) => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isRunning: false,
  aiComplexity: 0.5,
  simulationSpeed: 0.7,
  selectedAlgorithms: ["a-star"],
  terrainType: "highlands",

  toggleSimulation: () => 
    set((state: SimulationState) => ({ 
      isRunning: !state.isRunning 
    })),

  resetSimulation: () => 
    set({ isRunning: false }),

  setAiComplexity: (value: number) => 
    set({ aiComplexity: value }),

  setSimulationSpeed: (value: number) => 
    set({ simulationSpeed: value }),

  setTerrainType: (type: string) =>
    set({ terrainType: type }),

  toggleAlgorithm: (algorithmId: AlgorithmType) =>
    set((state: SimulationState) => {
      if (state.selectedAlgorithms.includes(algorithmId)) {
        return {
          selectedAlgorithms: state.selectedAlgorithms.filter((id: AlgorithmType) => id !== algorithmId),
        }
      } else {
        return {
          selectedAlgorithms: [...state.selectedAlgorithms, algorithmId],
        }
      }
    }),

}))

