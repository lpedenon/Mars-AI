import { Suspense } from "react";
import MarsSimulation from "@/components/mars-simulation";
import SimulationControls from "@/components/simulation-controls";
import AIComparisonPanel from "@/components/ai-comparison-panel";
import { InfoPanel } from "@/components/info-panel";
import { Loader } from "@/components/loader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-black p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-500">
            Mars AI Simulation
          </h1>
          <nav className="space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Algorithms
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Resources
            </a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto flex flex-1 flex-col gap-4 p-4 lg:flex-row">
        <div className="flex-1 rounded-lg bg-gray-900 p-2">
          <Suspense fallback={<Loader />}>
            <MarsSimulation />
          </Suspense>
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-80">
          <SimulationControls />
          {/* <AIComparisonPanel /> */}
          <InfoPanel />
        </div>
      </div>
    </main>
  );
}
