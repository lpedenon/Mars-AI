"use client";

import React, { useState, useEffect } from "react";
import { useSharedUnity } from "./shared-unity-context";

const RoverBrain: React.FC = () => {
    const [selectedBrain, setSelectedBrain] = useState("none");
    const { sendMessage, isLoaded } = useSharedUnity();
    
    const handleBrainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBrain(e.target.value);
        if (isLoaded) {
            sendMessage('WebGLBridge', 'SetBrain', e.target.value);
            console.log("setting rover brain to:", e.target.value);
        } else {
            console.log("Unity Instance not found when trying to swap brain");
        }
    };

    return (
        <div style={{ 
            position: "absolute",
            top: 100, // Positioned below UnityControls
            left: 20,
            zIndex: 10000,
            backgroundColor: "rgba(30, 30, 40, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            padding: "12px",
            color: "#fff",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            minWidth: "250px",
            maxWidth: "300px"
        }}>
            <label htmlFor="brain-select" style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>
                Select Brain:
            </label>
            <select
                id="barin-select"
                value={selectedBrain}
                onChange={handleBrainChange}
                style={{
                    width: "100%",
                    padding: "8px",
                    backgroundColor: "rgba(20, 20, 30, 0.7)",
                    color: "#fff",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "4px",
                    fontSize: "14px"
                }}
            >
                <option value="user">Manual Control</option>
                <option value="hill">Hill Avoidance AI</option>
                <option value="simple">Simple AI</option>
            </select>
        </div>
    );
};

export default RoverBrain;