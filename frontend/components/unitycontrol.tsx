// components/UnityControls.tsx
"use client";

import React, { useState, useEffect } from "react";

const UnityControls: React.FC = () => {
  const [isUnityLoaded, setIsUnityLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Function to handle the Unity loaded event
    const handleUnityLoaded = (event: CustomEvent) => {
      console.log("Unity loaded event received:", event.detail);
      setIsUnityLoaded(true);
    };

    // Check if Unity is already loaded
    const checkUnityLoaded = () => {
      if (typeof window !== 'undefined' && (window as any).unityInstance) {
        console.log("Unity instance found");
        setIsUnityLoaded(true);
      } else {
        console.log("Unity instance not found, waiting for event...");
      }
    };

    // Initial check
    checkUnityLoaded();

    // Add event listener for the Unity loaded event
    window.addEventListener('unityLoaded', handleUnityLoaded as EventListener);

    // Clean up function
    return () => {
      window.removeEventListener('unityLoaded', handleUnityLoaded as EventListener);
    };
  }, []);

  const togglePlayPause = () => {
    if (typeof window !== 'undefined' && (window as any).unityInstance) {
      if (isPaused) {
        // Resume the game
        (window as any).unityInstance.SendMessage('GameController', 'ResumeGame');
        console.log("Play button clicked");
      } else {
        // Pause the game
        (window as any).unityInstance.SendMessage('GameController', 'PauseGame');
        console.log("Pause button clicked");
      }
      // Toggle the paused state
      setIsPaused(!isPaused);
    } else {
      console.error("Unity instance not found");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 10000,
        display: "flex",
        gap: "10px",
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={togglePlayPause}
        disabled={!isUnityLoaded}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "rgba(30, 30, 40, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(40, 40, 50, 0.8)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(30, 30, 40, 0.7)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
      >
        {isPaused ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
            Play
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="4" height="16" fill="currentColor" />
              <rect x="14" y="4" width="4" height="16" fill="currentColor" />
            </svg>
            Pause
          </>
        )}
      </button>
    </div>
  );
};

export default UnityControls;
