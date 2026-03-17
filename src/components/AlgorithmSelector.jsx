import React from 'react';
import { useSimulation } from '../store/SimulationContext';

const AlgorithmSelector = () => {
  // Use the custom hook to access state and action dispatchers from the central store
  const {
    algorithm,
    setAlgorithm,
    timeQuantum,
    setTimeQuantum  // Use the new setTimeQuantum function instead of setNewProcessField
  } = useSimulation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Algorithm</h2>
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(194,97,97)] focus:border-[rgb(194,97,97)]"
      >
        <option value="FCFS">FCFS (First Come First Serve)</option>
        <option value="SJF_NonPreemptive">SJF (Non-preemptive)</option>
        <option value="SJF_Preemptive">SJF (Preemptive)</option>
        <option value="Priority_NonPreemptive">Priority (Non-preemptive)</option>
        <option value="Priority_Preemptive">Priority (Preemptive)</option>
        <option value="RoundRobin">Round Robin</option>
      </select>

      {/* Conditionally rendered input for Time Quantum */}
      {algorithm === 'RoundRobin' && (
        <div className="mt-4">
          <label className="block text-gray-700 mb-2">Time Quantum</label>
          <input
            type="number"
            placeholder="Time Quantum"
            value={timeQuantum}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              // Allow empty input or valid numbers between 1 and 10
              if (e.target.value === '' || (value >= 1 && value <= 10 && !isNaN(value))) {
                setTimeQuantum(e.target.value === '' ? 1 : value);
              }
            }}
            min="1"
            max="10"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(194,97,97)] focus:border-[rgb(194,97,97)]"
          />
          <p className="text-sm text-gray-500 mt-1">Enter a value between 1 and 10</p>
        </div>
      )}
    </div>
  );
};

export default AlgorithmSelector;