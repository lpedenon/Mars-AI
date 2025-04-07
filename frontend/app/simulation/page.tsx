// "use client"

// import { Suspense } from "react"
// import MarsSimulation from "@/components/mars-simulation"
// import SimulationControls from "@/components/simulation-controls"
// import AIComparisonPanel from "@/components/ai-comparison-panel"
// import { InfoPanel } from "@/components/info-panel"
// import { Loader } from "@/components/loader"

// export default function SimulationPage() {
//   return (
//     <h1>Simulation</h1>
//   )
// } 

// pages/simulation/page.tsx
"use client";

import { Suspense } from "react";
import UnityEmbed from "@/components/unityembeded";
import UnityControls from "@/components/unitycontrol";
import SimulationControls from "@/components/simulation-controls";
import AIComparisonPanel from "@/components/ai-comparison-panel";
import { InfoPanel } from "@/components/info-panel";
import { Loader } from "@/components/loader";

export default function SimulationPage() {
  return (
    <div>
      <h1>Simulation</h1>
      {/* You might wrap UnityEmbed in Suspense if you want to show a loader */}
      <Suspense fallback={<Loader />}>
        <UnityEmbed />
      </Suspense>
      <UnityControls />
      {/* Additional UI elements such as controls or info panels */}
      <SimulationControls />
      <AIComparisonPanel />
      <InfoPanel />
    </div>
  );
}
