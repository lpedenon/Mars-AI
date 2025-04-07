// components/UnityEmbed.tsx
"use client";

import React from "react";

const UnityEmbed: React.FC = () => {
  return (
    <iframe
      src="/MarsAIWeb/index.html"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
      title="Mars AI Simulator Unity WebGL"
    />
  );
};

export default UnityEmbed;
