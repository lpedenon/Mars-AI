// components/UnityComponent.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Unity } from "react-unity-webgl";
import { useSharedUnity } from "@/components/shared-unity-context";
import { setupUnityCommunication } from "@/lib/unity-communication";

const UnityComponent: React.FC = () => {
  // Consume the single shared Unity context
  const { unityProvider, isLoaded, loadingProgression } = useSharedUnity();
  const devicePixelRatio = 
    typeof window !== "undefined"
      ? window.devicePixelRatio
      : 1;

  // Set up communication between Unity and React
  useEffect(() => {
    setupUnityCommunication();
    console.log("wdpr:", window.devicePixelRatio, "dpr:", devicePixelRatio);
  }, []);

  // Debug cavas size
  // useEffect(() => {
  //   const canvas = document.getElementById('unity-canvas') as HTMLCanvasElement;
  //   if (canvas) {
  //     console.log('Canvas dimensions:', {
  //       width: canvas.width,
  //       height: canvas.height,
  //       clientWidth: canvas.clientWidth,
  //       clientHeight: canvas.clientHeight,
  //       offsetWidth: canvas.offsetWidth,
  //       offsetHeight: canvas.offsetHeight,
  //       styleWidth: canvas.style.width,
  //       styleHeight: canvas.style.height
  //     });
  //   }
  // });

  return (
    <div id="unity-container" style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Render the Unity canvas */}
      <Unity
        id="unity-canvas"
        key={devicePixelRatio}
        unityProvider={unityProvider}
        matchWebGLToCanvasSize={true} 
        devicePixelRatio={devicePixelRatio}
        // style={{ width: "100%", height: "100%", display: "block" }}
        style={{ width: "100%", height: "100%" }}
      />
      
      {/* Show a loading indicator until Unity is fully loaded */}
      {!isLoaded && (
        <div style={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          Loading Unity... {Math.round(loadingProgression * 100)}%
        </div>
      )}
    </div>
  );
};

export default UnityComponent;
