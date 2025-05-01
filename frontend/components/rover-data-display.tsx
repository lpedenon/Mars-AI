"use client";

import React, { useState, useEffect, useRef } from "react";
import { RoverData, updateRoverData, getRoverData } from "@/lib/unity-communication";
import { useSharedUnity } from "@/components/shared-unity-context";
// import { useUnity } from "@/components/unity-provider";

const RoverDataDisplay: React.FC = () => {
  const [roverData, setRoverData] = useState<RoverData>({});
  const [isOpen, setIsOpen] = useState(true);
  const latestDataRef = useRef<RoverData>({});
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isLoaded } = useSharedUnity();

  useEffect(() => {
    if (!isLoaded) return;

    // Function to handle the Unity data received event
    const handleUnityDataReceived = (event: CustomEvent<RoverData>) => {
      const data = event.detail;
      // Store the latest data in the ref
      latestDataRef.current = data;
      // Update the latest rover data in the utility
      updateRoverData(data);
    };

    // Function to update the display at a controlled rate
    const updateDisplay = () => {
      setRoverData(latestDataRef.current);
    };

    // Get initial rover data if available
    setRoverData(getRoverData());
    latestDataRef.current = getRoverData();

    // Add event listener for the Unity data received event
    window.addEventListener('unityDataReceived', handleUnityDataReceived as EventListener);

    // Set up an interval to update the display once per second
    updateIntervalRef.current = setInterval(updateDisplay, 1000);

    // Clean up function
    return () => {
      window.removeEventListener('unityDataReceived', handleUnityDataReceived as EventListener);
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [isLoaded]);

  // Function to format a value to a maximum of 2 decimal places
  const formatValue = (value: any): string => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return `[${value.map(formatValue).join(', ')}]`;
      }
      return JSON.stringify(value, (key, val) => {
        if (typeof val === 'number') {
          return Number(val.toFixed(2));
        }
        return val;
      });
    }
    return String(value);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 10000,
        backgroundColor: "rgba(30, 30, 40, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        padding: "12px",
        color: "#fff",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        // minWidth: "220px",
        // maxWidth: "250px",
        minWidth: "300px",
        maxWidth: "350px",
        transition: "all 0.3s ease",
      }}
    >
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "8px",
          cursor: "pointer"
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>Rover Data</h3>
        <button 
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isOpen ? "−" : "+"}
        </button>
      </div>
      
      {isOpen && (
        Object.keys(roverData).length === 0 ? (
          <p style={{ margin: 0, fontSize: "14px" }}>
            {isLoaded ? "Waiting for data from Unity..." : "Unity not loaded"}
          </p>
        ) : (
          <div style={{ fontSize: "14px" }}>
            {roverData.roverPosition && (
              <div style={{ marginBottom: "6px" }}>
                <strong>Position:</strong> X: {formatValue(roverData.roverPosition.x)}, 
                Y: {formatValue(roverData.roverPosition.y)}, 
                Z: {formatValue(roverData.roverPosition.z)}
              </div>
            )}
            
            {roverData.roverSpeed !== undefined && (
              <div style={{ marginBottom: "6px" }}>
                <strong>Speed:</strong> {formatValue(roverData.roverSpeed)} m/s
              </div>
            )}
            
            {roverData.roverBattery !== undefined && (
              <div style={{ marginBottom: "6px" }}>
                <strong>Battery:</strong> {formatValue(roverData.roverBattery)}%
              </div>
            )}
            
            {roverData.roverStatus && (
              <div style={{ marginBottom: "6px" }}>
                <strong>Status:</strong> {roverData.roverStatus}
              </div>
            )}
            
            {roverData.batteryLevel !== undefined && (
              <div style={{ marginBottom: "6px" }}>
                <strong>Battery Level:</strong> {formatValue(roverData.batteryLevel)}%
              </div>
            )}
            
            {roverData.distanceTraveled !== undefined && (
              <div style={{ marginBottom: "6px" }}>
                <strong>Distance:</strong> {formatValue(roverData.distanceTraveled)} m
              </div>
            )}
            
            {roverData.algorithmPerformance && (
              <div style={{ marginBottom: "6px" }}>
                <strong>Performance:</strong>
                <div style={{ marginLeft: "8px", fontSize: "12px" }}>
                  {Object.entries(roverData.algorithmPerformance).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {formatValue(value)}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Display any other properties that might be in the rover data */}
            {Object.entries(roverData).map(([key, value]) => {
              // Skip properties already displayed
              if ([
                'roverPosition', 'roverSpeed', 'roverBattery', 'roverStatus',
                'batteryLevel', 'distanceTraveled', 'currentAlgorithm', 'algorithmPerformance'
              ].includes(key)) {
                return null;
              }
              
              return (
                <div key={key} style={{ marginBottom: "6px" }}>
                  <strong>{key}:</strong> {formatValue(value)}
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

export default RoverDataDisplay;