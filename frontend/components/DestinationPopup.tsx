"use client";

import React, { useEffect, useState } from "react";

interface DestinationPopupProps {
  distance: number;
  battery: number;
  timeElapsed: number;
  onClose: () => void;
}

export default function DestinationPopup({ distance, battery, timeElapsed, onClose }: DestinationPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start fade-in animation
    setVisible(true);
  }, []);

  const handleClose = () => {
    // Start fade-out first
    setVisible(false);
    // Then actually close after animation
    setTimeout(() => {
      onClose();
    }, 300); // match the fade duration
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div style={{
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "10px",
        minWidth: "300px",
        maxWidth: "400px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        transform: visible ? "scale(1)" : "scale(0.9)",
        transition: "transform 0.3s ease",
      }}>
        <h2 style={{ marginBottom: "16px", fontSize: "24px", color: "#333" }}>
          🏁 Destination Reached!
        </h2>
        <p style={{ margin: "8px 0", fontSize: "16px" }}>
          <strong>Distance:</strong> {distance.toFixed(2)} meters
        </p>
        <p style={{ margin: "8px 0", fontSize: "16px" }}>
          <strong>Battery Remaining:</strong> {battery.toFixed(1)}%
        </p>
        <p style={{ margin: "8px 0", fontSize: "16px" }}>
          <strong>Time Elapsed:</strong> {timeElapsed.toFixed(1)} seconds
        </p>

        <button
          onClick={handleClose}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
