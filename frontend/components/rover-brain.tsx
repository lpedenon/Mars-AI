"use client";

import React, { useState, useEffect } from "react";
import { useSharedUnity } from "@/components/shared-unity-context";
// import { useUnity } from "@/components/unity-provider";
import { useSimulationConfig } from "@/lib/SimulationConfig";

const RoverBrain: React.FC = () => {
    const [selectedBrain, setSelectedBrain] = useState("user");
    const { sendMessage, isLoaded } = useSharedUnity();
    const { config, setConfig } = useSimulationConfig();

    useEffect(() => {
        if (!isLoaded) {
            console.log("Unity Instance not found when trying to set brain");
        }
        else {
            console.log("Unity Instance found when trying to set brain");
        }
    }, [isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            sendMessage('WebGLBridge', 'SetBrain', config.brain);
            setSelectedBrain(config.brain);
            console.log("Unity brain updated to:", config.brain);
        } else {
            console.log("Unity not loaded yet when trying to set brain");
        }
    }, [isLoaded, config.brain]); // Add config.brain to dependencies
    
    const handleBrainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newBrain = e.target.value;
        setSelectedBrain(newBrain);
        setConfig({ ...config, brain: newBrain });
        
        if (isLoaded) {
            sendMessage('WebGLBridge', 'SetBrain', newBrain);
            console.log("setting rover brain to:", newBrain);
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
                id="brain-select"
                value={isLoaded ? selectedBrain : ""}
                onChange={handleBrainChange}
                disabled={!isLoaded}
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
                {!isLoaded && <option value="">Loading...</option>}
                <option value="user">Manual Control</option>
                <option value="hill">Hill Avoidance</option>
                <option value="shortest-path">Shortest Path</option>
            </select>
        </div>
    );
};

export default RoverBrain;