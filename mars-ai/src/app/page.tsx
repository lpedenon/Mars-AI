'use client'

import { useState } from 'react'
import { Brain, Navigation, Play, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { Toaster } from 'sonner'

interface MenuOption {
  icon: React.ReactNode
  id: 'brain' | 'destination' | 'simulation' | 'logs'
  title: string
  description: string
  enabled: boolean
}

export default function Page() {
  const [selectedBrain, setSelectedBrain] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState(false)

  const menuOptions: MenuOption[] = [
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      id: 'brain',
      title: 'Select AI Brain',
      description: 'Choose from different AI models for pathfinding',
      enabled: true
    },
    {
      icon: <Navigation className="w-6 h-6 text-primary" />,
      id: 'destination',
      title: 'Select Start/End Destination',
      description: 'Set navigation points on Mars terrain',
      enabled: true
    },
    {
      icon: <Play className='w-6 h-6 text-primary' />,
      id: 'simulation',
      title: 'Run Simulation',
      description: 'Execute the pathfinding simulation',
      enabled: selectedBrain && selectedDestination
    },
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      id: 'logs',
      title: 'View Logs',
      description: 'Review simulation history and analytics',
      enabled: true
    }
  ]

  // Add brain options
  const brainOptions = [
    { id: 'astar', name: 'A* Algorithm', description: 'Optimal pathfinding with heuristics' },
    { id: 'dijkstra', name: 'Dijkstra Algorithm', description: 'Classic shortest path algorithm' },
    { id: 'neural', name: 'Neural Network', description: 'ML-based pathfinding approach' },
  ]

  const handleOptionClick = (id: MenuOption['id']) => {
    switch (id) {
      case 'brain':
        toast('Select AI Brain', {
          duration: 10000,
          action: {
            label: 'Close',
            onClick: () => console.log('Closed')
          },
          description: (
            <div className="grid gap-2 mt-2">
              {brainOptions.map((brain) => (
                <button
                  key={brain.id}
                  onClick={() => {
                    setSelectedBrain(true)
                    toast.success(`Selected ${brain.name}`)
                  }}
                  className="p-2 text-left hover:bg-foreground/5 rounded-lg transition-colors"
                >
                  <div className="font-semibold">{brain.name}</div>
                  <div className="text-sm text-foreground/70">{brain.description}</div>
                </button>
              ))}
            </div>
          ),
        })
        break
      case 'destination':
        setSelectedDestination(true)
        break
    }
  }

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Add Toaster component */}
        <Toaster />
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <h1 className="text-4xl font-bold text-foreground font-mono">Mars AI Pathfinder</h1>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={!option.enabled}
              className={`
                p-6 rounded-lg border-2 text-left transition-all
                ${option.enabled 
                  ? 'border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5' 
                  : 'border-foreground/10 opacity-50 cursor-not-allowed'}
              `}
            >
              <div className="flex items-center gap-3 mb-2">
                {option.icon}
                <h2 className="text-xl font-bold">{option.title}</h2>
              </div>
              <p className="text-foreground/70">{option.description}</p>
              {!option.enabled && option.id === 'simulation' && (
                <p className="text-sm mt-2 text-foreground/50">
                  Please select a brain and destination first
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}