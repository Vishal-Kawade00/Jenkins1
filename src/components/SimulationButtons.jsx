import React from 'react';
import { useSimulation } from '../store/SimulationContext';

const SimulationButtons = () => {
  // Use the custom hook to get access to the simulation state and actions
  const { startAnimation, startPlot, processes } = useSimulation();

  // Determine if a simulation can be started (at least one process is required)
  const isStartDisabled = processes.length === 0;

  return (
    <div className="flex justify-around mt-6 space-x-4">
      <button
        onClick={startPlot}
        disabled={isStartDisabled}
        className="flex-1 px-4 py-3 text-white font-semibold bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors disabled:bg-gray-400"
        
      >
        Plot
      </button>
      <button
        onClick={startAnimation}
        disabled={isStartDisabled}
        className="flex-1 px-4 py-3 text-white bg-amber-700 hover:bg-amber-800 font-semibold rounded-md transition-colors disabled:bg-gray-400"
        
      >
        Animate
      </button>
    </div>
  );
};

export default SimulationButtons;
