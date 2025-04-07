// components/unityContext.ts
"use client";

import { useUnityContext } from "react-unity-webgl";

export const unityConfig = {
  loaderUrl: "/MarsAIWeb/Build/MarsAIWeb.loader.js",
  dataUrl: "/MarsAIWeb/Build/MarsAIWeb.data.gz",
  frameworkUrl: "/MarsAIWeb/Build/MarsAIWeb.framework.js.gz",
  codeUrl: "/MarsAIWeb/Build/MarsAIWeb.wasm.gz",
};

// Log the Unity configuration
console.log("Unity Config:", unityConfig);

export const useMyUnityContext = () => {
  console.log("Initializing Unity context");
  const unityContext = useUnityContext(unityConfig);
  console.log("Unity context initialized:", unityContext);
  return unityContext;
};
