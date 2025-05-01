"use client";

import { useState, Suspense, useEffect } from "react";
// import { useMyUnityContext } from "@/components/unitycontext";
// import { SharedUnityContext } from "@/components/shared-unity-context";
// import { useSharedUnity } from "@/components/shared-unity-context";
// import { UnityProvider } from "@/components/unity-provider";
import UnityComponent from "@/components/unitycomponent";
import UnityControls from "@/components/unitycontrol";
import SimulationControls from "@/components/simulation-controls";
import AIComparisonPanel from "@/components/ai-comparison-panel";
import { InfoPanel } from "@/components/info-panel";
import { Loader } from "@/components/loader";
import RoverDataDisplay from "@/components/rover-data-display";
import RoverBrain from "@/components/rover-brain";
import UnityLogger from "@/components/unity-logger";
import { useSimulationConfig } from "@/lib/SimulationConfig";
import { getRoverData } from "@/lib/unity-communication";
import DestinationPopup from "@/components/destination-popup";
import HomeButton from "@/components/home-button";

export default function SimulationPage() {
  const [destinationReached, setDestinationReached] = useState(false);
  const [finalStats, setFinalStats] = useState({ distance: 0, battery: 0, timeElapsed: 0 });
  const [elapsedTime, setElapsedTime] = useState(0);
  const { config } = useSimulationConfig();

  useEffect(() => {
    // Step 1: Define Unity hook
    (window as any).OnDPReached = () => {
      console.log("[Unity] Destination Reached Event Received!");
      const event = new CustomEvent('destinationReached');
      window.dispatchEvent(event);
    };
  
    // Step 2: Define React handler
    const handleDestinationReached = () => {
      console.log("[React] Destination Reached Triggered!");
  
      const roverData = getRoverData();
      setFinalStats({
        distance: roverData.distanceTraveled ?? 0,
        battery: roverData.batteryLevel ?? roverData.roverBattery ?? 0,
        timeElapsed: roverData.algorithmPerformance?.timeElapsed ?? elapsedTime,
      });
      setDestinationReached(true);
    };
  
    window.addEventListener('destinationReached', handleDestinationReached);
  
    return () => {
      window.removeEventListener('destinationReached', handleDestinationReached);
    };
  }, [elapsedTime, config]);

  return (
    // <SharedUnityContext.Provider value={unity}>
      <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <Suspense fallback={<Loader />}>
            <UnityComponent />
          </Suspense>
        </div>
        
        <HomeButton />
        <UnityControls />
        <SimulationControls />
        <RoverDataDisplay />
        <RoverBrain />
        {destinationReached && (
          <DestinationPopup
            distance={finalStats.distance}
            battery={finalStats.battery}
            timeElapsed={finalStats.timeElapsed}
            onClose={() => setDestinationReached(false)}
          />
        )}
        <UnityLogger />
        <AIComparisonPanel />
        <InfoPanel />
      </div>
    // </SharedUnityContext.Provider>
  );
}
