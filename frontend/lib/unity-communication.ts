// lib/unity-communication.ts

// Define the type for the rover data
export interface RoverData {
  roverPosition?: { x: number; y: number; z: number };
  roverSpeed?: number;
  roverBattery?: number;
  roverStatus?: string;
  batteryLevel?: number;
  distanceTraveled?: number;
  currentAlgorithm?: string;
  algorithmPerformance?: {
    pathLength?: number;
    nodesExplored?: number;
    timeElapsed?: number;
    [key: string]: any;
  };
  // Add other properties as needed
}

// Create a global function that Unity can call
export function setupUnityCommunication() {
  // Define the function that Unity will call
  (window as any).ReceiveData = (jsonData: string) => {
    try {
      // Replace NaN values with null before parsing
      const sanitizedJson = jsonData.replace(/:\s*NaN/g, ': null');
      const data = JSON.parse(sanitizedJson) as RoverData;
    //   console.log("Data received from Unity:", data);
      
      // Dispatch a custom event with the data
      const event = new CustomEvent('unityDataReceived', { detail: data });
      window.dispatchEvent(event);
      
      return true; // Return true to indicate success
    } catch (error) {
      console.error("Error parsing data from Unity:", error);
      console.log("Raw data received:", jsonData);
      return false; // Return false to indicate failure
    }
  };
  
  console.log("Unity communication setup complete");
}

// Function to get the latest rover data
let latestRoverData: RoverData = {};

// Function to update the latest rover data
export function updateRoverData(data: RoverData) {
  latestRoverData = { ...latestRoverData, ...data };
}

// Function to get the latest rover data
export function getRoverData(): RoverData {
  return latestRoverData;
} 