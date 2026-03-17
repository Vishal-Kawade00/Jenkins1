import React from 'react';
import { useSimulation } from '../store/SimulationContext';

const TimelineChart = ({ theme }) => {
  const { simulation } = useSimulation();
  const { detailedResults } = simulation.metrics;

  if (!detailedResults || detailedResults.length === 0) {
    return <div className="text-center italic text-gray-500">No data to display in timeline chart.</div>;
  }

  const chartWidth = detailedResults.length * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
      <h3 className="text-xl font-bold mb-4">Timeline Chart</h3>
      <div className="w-full" style={{ minWidth: `${chartWidth}px` }}>
        <div className="flex flex-col space-y-2">
          {detailedResults.map(p => (
            <div key={p.id} className="relative flex flex-col items-start">
              <div className="font-bold text-gray-800 mb-1">{`P${p.id}`}</div>
              <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                <div
                  style={{ 
                    width: `${(p.completionTime / simulation.totalTime) * 10}%`, 
                    backgroundColor: p.color,
                    transition: 'width 0.5s ease-in-out'
                  }}
                  className="h-full rounded-full"
                ></div>
                <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-sm font-semibold">
                  {p.completionTime}ms
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;
