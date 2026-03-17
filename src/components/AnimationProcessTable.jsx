import React from 'react';
import { useSimulation } from '../store/SimulationContext';

const AnimationProcessTable = () => {
  const { uiMode, simulation, algorithm} = useSimulation();

  // Conditionally show this table only in the 'animate' and 'plot' modes
  if (uiMode !== 'animate' && uiMode !== 'plot' ) {
    return null;
  }

  // Get the current step's state from the simulation
  const currentStep = simulation.steps[simulation.currentSlideIndex] || {};
  const remaining = currentStep.remaining || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-h-[680px] overflow-auto">
      <h2 className="text-xl font-bold mb-4">Process Status</h2>
      <table className="min-w-full text-left table-auto">
        <thead>
          <tr className="border-b-2 border-gray-500">
            <th className="px-4 py-2">PID</th>
            <th className="px-4 py-2">AT</th>
            <th className="px-4 py-2">BT</th>
            <th className="px-4 py-2">PT</th>
            <th className="px-4 py-2">Remaining BT</th>
          </tr>
        </thead>
        <tbody>
          {remaining.length > 0 ? (
            remaining.map(p => (
              <tr
                key={p.id}
                className="border-b border-gray-200"
              >
                <td className="px-4 py-2 font-bold" style={{ color: p.color }}>P{p.id}</td>
                <td className="px-4 py-2">{p.arrival}</td>
                <td className="px-4 py-2">{p.burst}</td>
                {algorithm.includes('Priority') && <td className="px-4 py-2">{p.priority}</td>}
                <td className="px-4 py-2">{p.remainingBurstTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center italic text-gray-500">
                No processes available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AnimationProcessTable;
