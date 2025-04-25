// components/UnityLogger.tsx
"use client";

import { useEffect } from "react";
import { useSharedUnity } from "./shared-unity-context";

const UnityLogger: React.FC = () => {
  const unity = useSharedUnity();

  useEffect(() => {
    const onDebug = (msg: any) => console.log("Unity ▶", msg);
    const onWarn  = (msg: any) => console.warn("Unity ▶", msg);
    const onErr   = (msg: any) => console.error("Unity ▶", msg);

    unity.addEventListener("debug",   onDebug);
    unity.addEventListener("warning", onWarn);
    unity.addEventListener("error",   onErr);

    return () => {
      unity.removeEventListener("debug",   onDebug);
      unity.removeEventListener("warning", onWarn);
      unity.removeEventListener("error",   onErr);
    };
  }, [unity]);

  return null;
};

export default UnityLogger;
