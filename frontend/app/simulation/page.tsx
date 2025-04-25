"use client";

import { Suspense } from "react";
import { useMyUnityContext } from "@/components/unitycontext";
import { SharedUnityContext } from "@/components/shared-unity-context";
import UnityComponent from "@/components/unitycomponent";
import UnityControls from "@/components/unitycontrol";
import SimulationControls from "@/components/simulation-controls";
import AIComparisonPanel from "@/components/ai-comparison-panel";
import { InfoPanel } from "@/components/info-panel";
import { Loader } from "@/components/loader";
import RoverDataDisplay from "@/components/rover-data-display";
import RoverBrain from "@/components/rover-brain";
import UnityLogger from "@/components/UnityLogger";

export default function SimulationPage() {
  const unity = useMyUnityContext();

  return (
    <SharedUnityContext.Provider value={unity}>
      <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <Suspense fallback={<Loader />}>
            <UnityComponent />
          </Suspense>
        </div>
        
        <UnityControls />
        <SimulationControls />
        <RoverDataDisplay />
        <RoverBrain />
        <UnityLogger />
        <AIComparisonPanel />
        <InfoPanel />
      </div>
    </SharedUnityContext.Provider>
  );
}
