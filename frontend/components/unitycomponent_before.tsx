// components/UnityComponent.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { setupUnityCommunication } from "@/lib/unity-communication";

// Global script loading state
const globalScriptState = {
  isLoading: false,
  isLoaded: false,
  loadPromise: null as Promise<void> | null,
  scriptElement: null as HTMLScriptElement | null,
};

// Function to load the Unity script globally
const loadUnityScript = (): Promise<void> => {
  // If already loaded, return immediately
  if (globalScriptState.isLoaded) {
    return Promise.resolve();
  }

  // If already loading, return the existing promise
  if (globalScriptState.loadPromise) {
    return globalScriptState.loadPromise;
  }

  // Create a new promise for loading
  globalScriptState.loadPromise = new Promise<void>((resolve, reject) => {
    // Check if script already exists in the DOM
    const existingScript = document.querySelector('script[src="/MarsAIWeb/Build/MarsAIWeb.loader.js"]');
    if (existingScript) {
      console.log("Script already exists in DOM, waiting for it to load");
      globalScriptState.isLoaded = true;
      resolve();
      return;
    }

    console.log("Loading Unity loader script globally");
    globalScriptState.isLoading = true;

    const script = document.createElement('script');
    script.src = '/MarsAIWeb/Build/MarsAIWeb.loader.js';
    script.async = true;
    
    script.onload = () => {
      console.log("Unity loader script loaded globally");
      globalScriptState.isLoaded = true;
      globalScriptState.isLoading = false;
      resolve();
    };
    
    script.onerror = (error) => {
      console.error("Error loading Unity loader script globally:", error);
      globalScriptState.isLoading = false;
      globalScriptState.loadPromise = null;
      reject(error);
    };
    
    globalScriptState.scriptElement = script;
    document.body.appendChild(script);
  });

  return globalScriptState.loadPromise;
};

const UnityComponent: React.FC = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isUnityLoaded, setIsUnityLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Unity
  const initializeUnity = async () => {
    try {
      console.log("Initializing Unity...");
      
      // Create a canvas element for Unity
      const canvas = document.createElement('canvas');
      canvas.id = 'unity-canvas';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      document.getElementById('unity-container')?.appendChild(canvas);
      
      // Load the Unity build
      const buildUrl = '/MarsAIWeb/Build';
      const config = {
        dataUrl: `${buildUrl}/MarsAIWeb.data.gz`,
        frameworkUrl: `${buildUrl}/MarsAIWeb.framework.js.gz`,
        codeUrl: `${buildUrl}/MarsAIWeb.wasm.gz`,
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'DefaultCompany',
        productName: 'MarsAIWeb',
        productVersion: '0.1',
      };
      
      // Create the Unity instance
      const unityInstance = await (window as any).createUnityInstance(canvas, config, (progress: number) => {
        // console.log(`Loading progress: ${progress * 100}%`);
        setLoadingProgress(progress);
      });
      
      console.log("Unity instance created:", unityInstance);
      setIsUnityLoaded(true);
      setIsLoading(false);
      
      // Store the Unity instance in the window object for later use
      (window as any).unityInstance = unityInstance;
      
      // Set up communication between Unity and React
      setupUnityCommunication();
      
      // Dispatch a custom event to notify other components that Unity is loaded
      const event = new CustomEvent('unityLoaded', { detail: { unityInstance } });
      window.dispatchEvent(event);
      
      console.log("Unity loaded event dispatched");
    } catch (error) {
      console.error("Error initializing Unity:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Function to check if Unity is ready to initialize
    const checkUnityReady = () => {
      if (typeof window !== 'undefined' && (window as any).createUnityInstance) {
        console.log("Unity loader script is available");
        setIsScriptLoaded(true);
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
          checkIntervalRef.current = null;
        }
        initializeUnity();
      }
    };

    // Try to load the script globally first
    loadUnityScript()
      .then(() => {
        console.log("Unity script loaded successfully via global loader");
        setIsScriptLoaded(true);
        checkUnityReady();
      })
      .catch(error => {
        console.error("Failed to load Unity script via global loader:", error);
        // If global loading fails, start checking periodically
        checkIntervalRef.current = setInterval(checkUnityReady, 2000);
      });
    
    // Clean up function
    return () => {
      // Clean up any resources if needed
      if (typeof window !== 'undefined' && (window as any).unityInstance) {
        console.log("Cleaning up Unity instance");
        // You might want to call a cleanup method on the Unity instance if available
      }
      
      // Clear the interval
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    };
  }, []);

  const handleScriptLoad = () => {
    console.log("Unity loader script loaded via Script component");
    setIsScriptLoaded(true);
    initializeUnity();
  };

  const handleScriptError = (e: any) => {
    console.error("Error loading Unity loader script:", e);
    // Try to load the script globally if the Script component fails
    if (typeof window !== 'undefined' && !(window as any).createUnityInstance) {
      loadUnityScript()
        .then(() => {
          console.log("Unity script loaded successfully via global loader after Script component error");
          setIsScriptLoaded(true);
          initializeUnity();
        })
        .catch(error => {
          console.error("Failed to load Unity script via global loader after Script component error:", error);
        });
    }
  };

  // Debug cavas size
  useEffect(() => {
    const canvas = document.getElementById('unity-canvas') as HTMLCanvasElement;
    if (canvas) {
      console.log('Canvas dimensions:', {
        width: canvas.width,
        height: canvas.height,
        clientWidth: canvas.clientWidth,
        clientHeight: canvas.clientHeight,
        offsetWidth: canvas.offsetWidth,
        offsetHeight: canvas.offsetHeight,
        styleWidth: canvas.style.width,
        styleHeight: canvas.style.height
      });
    }
  });

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Load the Unity loader script directly */}
      <Script
        src="/MarsAIWeb/Build/MarsAIWeb.loader.js"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        strategy="beforeInteractive"
      />
      
      {/* Container for the Unity canvas */}
      <div id="unity-container" style={{ width: "100%", height: "100%" }}></div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div style={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          Loading Unity... {Math.round(loadingProgress * 100)}%
          {!isScriptLoaded && <div>Loading Unity script...</div>}
        </div>
      )}
    </div>
  );
};

export default UnityComponent;
