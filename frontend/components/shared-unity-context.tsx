// components/SharedUnityContext.tsx
"use client";

import { createContext, useContext } from "react";
import { useUnityContext } from "react-unity-webgl";

// Derive the actual return type of useUnityContext
type UnityContextType = ReturnType<typeof useUnityContext>;

// Create a React context to hold that Unity context
export const SharedUnityContext = createContext<UnityContextType | null>(null);

// Custom hook to consume it safely
export function useSharedUnity(): UnityContextType {
  const ctx = useContext(SharedUnityContext);
  if (!ctx) {
    throw new Error("useSharedUnity must be used within a SharedUnityContext.Provider");
  }
  return ctx;
}
