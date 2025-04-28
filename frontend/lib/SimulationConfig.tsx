// lib/SimulationConfigContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type SimConfig = {
  spawnIndex: number;
  brain: "none" | "hill" | "simple";
};

const DEFAULT: SimConfig = {
  spawnIndex: 0,
  brain: "none",
};

type ContextType = {
  config: SimConfig;
  setConfig: (c: SimConfig) => void;
};

const SimulationConfigContext = createContext<ContextType | null>(null);

export function SimulationConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SimConfig>(DEFAULT);

  // optional: persist to sessionStorage so refresh won't lose it
  useEffect(() => {
    const raw = sessionStorage.getItem("simConfig");
    if (raw) setConfig(JSON.parse(raw));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("simConfig", JSON.stringify(config));
  }, [config]);

  return (
    <SimulationConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </SimulationConfigContext.Provider>
  );
}

export function useSimulationConfig() {
  const ctx = useContext(SimulationConfigContext);
  if (!ctx)
    throw new Error(
      "useSimulationConfig must be used within SimulationConfigProvider"
    );
  return ctx;
}
