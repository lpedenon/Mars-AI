// components/unityContext.ts
"use client";

import React from "react";
import { useUnityContext } from "react-unity-webgl";

export const unityConfig = {
  loaderUrl: "/MarsAIWeb/Build/MarsAIWeb.loader.js",
  dataUrl: "/MarsAIWeb/Build/MarsAIWeb.data.gz",
  frameworkUrl: "/MarsAIWeb/Build/MarsAIWeb.framework.js.gz",
  codeUrl: "/MarsAIWeb/Build/MarsAIWeb.wasm.gz",
  streamingAssetsUrl: 'StreamingAssets',
  productName: 'MarsAIWeb',
  productVersion: '0.1',
};

// Log the Unity configuration
console.log("Unity Config:", unityConfig);

export const useMyUnityContext = () => {
  const already = React.useRef(false);
  if (!already.current) {
    console.log("Initializing Unity context (first and only time)");
    already.current = true;
  }
  const unityContext = useUnityContext(unityConfig);

  return unityContext;
};
