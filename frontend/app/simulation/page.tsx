"use client";

import { Suspense } from "react";
// import UnityEmbed from "@/components/unityembeded";
import UnityComponent from "@/components/unitycomponent";
import UnityControls from "@/components/unitycontrol";
import SimulationControls from "@/components/simulation-controls";
import AIComparisonPanel from "@/components/ai-comparison-panel";
import { InfoPanel } from "@/components/info-panel";
import { Loader } from "@/components/loader";
import RoverDataDisplay from "@/components/rover-data-display";
// import { Unity } from "react-unity-webgl";

export default function SimulationPage() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <Suspense fallback={<Loader />}>
          <UnityComponent />
        </Suspense>
      </div>
      
      <UnityControls />
      <SimulationControls />
      <RoverDataDisplay />
      <AIComparisonPanel />
      <InfoPanel />
    </div>
  );
}
