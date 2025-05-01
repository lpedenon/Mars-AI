// components/unityContext.ts
"use client";

import { useRef, useState, useEffect } from "react";
import { useUnityContext } from "react-unity-webgl";

export const useMyUnityContext = () => {
  const contextRef = useRef<ReturnType<typeof useUnityContext> | null>(null);
  const [readyContext, setReadyContext] = useState<ReturnType<typeof useUnityContext> | null>(null);

  // This will always be called safely
  const ctx = useUnityContext({
    loaderUrl: "/MarsAIWeb/Build/MarsAIWeb.loader.js",
    dataUrl: "/MarsAIWeb/Build/MarsAIWeb.data.gz",
    frameworkUrl: "/MarsAIWeb/Build/MarsAIWeb.framework.js.gz",
    codeUrl: "/MarsAIWeb/Build/MarsAIWeb.wasm.gz",
    streamingAssetsUrl: "StreamingAssets",
    productName: "MarsAIWeb",
    productVersion: "0.1",
    companyName: "MarsAIWeb",
    webglContextAttributes: { antialias: true },
  });

  return ctx;
};
