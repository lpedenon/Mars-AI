# Mars AI Simulation

A Next.js-based web application that simulates AI navigation on Mars using different pathfinding algorithms and terrain types.

## Project Overview

This project is a Mars exploration simulation that demonstrates various AI pathfinding algorithms across different Martian terrains. The application features a real-time visualization of rover navigation and allows users to experiment with different AI configurations and terrain types.

## Features

### Simulation Controls
- **AI Complexity**: Adjustable slider (0.1 to 1.0) to control the sophistication of AI decision-making
- **Simulation Speed**: Control the speed of the simulation (0.1 to 1.0)
- **Terrain Selection**: Choose between different Martian landscapes:
  - Martian Highlands
  - Valles Marineris
  - Olympus Mons
- **AI Algorithm Selection**: Toggle between different pathfinding algorithms:
  - A* Algorithm (Optimal path finding)
  - Dijkstra's Algorithm (Shortest path)
  - RRT (Rapidly-exploring random tree)
  - Neural Network (Learning-based navigation)

### Visualization
- Real-time canvas-based visualization of rover movement
- Dynamic terrain rendering based on selected location
- Fullscreen mode support
- Play/Pause controls
- Progress tracking and visualization

## Technical Stack

- **Frontend Framework**: Next.js with TypeScript
- **State Management**: Zustand
- **UI Components**: Custom components built with Tailwind CSS
- **Visualization**: HTML5 Canvas
- **Image Handling**: Next.js Image component

## Project Structure

```
frontend/
├── app/
│   └── page.tsx              # Main application page
├── components/
│   ├── simulation-controls.tsx  # Control panel for simulation parameters
│   ├── mars-simulation.tsx      # Main simulation visualization
│   ├── ai-comparison-panel.tsx  # AI algorithm comparison interface
│   ├── info-panel.tsx          # Information display panel
│   └── loader.tsx              # Loading state component
├── lib/
│   ├── simulation-store.ts     # Global state management
│   └── utils.ts                # Utility functions
└── public/
    └── images/                 # Terrain images
        ├── mars-surface.jpg
        ├── valles-marineris.jpg
        └── olympus-mons.jpg
```

## State Management

The application uses Zustand for state management with the following key state properties:

```typescript
interface SimulationState {
  isRunning: boolean
  aiComplexity: number
  simulationSpeed: number
  selectedAlgorithms: AlgorithmType[]
  terrainType: string
}
```

## Key Components

### Simulation Controls
- Provides user interface for adjusting simulation parameters
- Handles terrain type selection
- Manages AI algorithm toggling
- Controls simulation speed and AI complexity

### Mars Simulation
- Renders the main simulation canvas
- Handles terrain visualization
- Manages rover movement and path visualization
- Supports fullscreen mode
- Implements play/pause functionality

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Future Enhancements

- Add more terrain types and corresponding images
- Implement actual pathfinding algorithm visualizations
- Add rover customization options
- Include detailed statistics and metrics
- Add terrain generation capabilities
- Implement multi-rover scenarios
- Add collision detection and avoidance
- Include weather and environmental effects

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your license information here]