import React from 'react';
import { useSimulation } from '../store/SimulationContext';
import GanttChart from './GanttChart';
import MetricsPanel from './MetricsPanel';
import TimelineChart from './TimelineChart';

const Results = ({ theme }) => {
  const { simulation } = useSimulation();

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-md space-y-8"
      style={{ backgroundColor: theme.surface, color: theme.text }}
    >
      <h2 className="text-3xl font-extrabold text-center">Simulation Results</h2>

      <MetricsPanel theme={theme}/>
      
      {/* Gantt Chart section */}
      <div>
        {/* <h3 className="text-xl font-bold mb-4">Final Gantt Chart</h3> */}
        <GanttChart theme={theme} final={true}/>
      </div>

        <div>
        {/* <h3 className="text-xl font-bold mb-4">Final TimeLine Chart</h3> */}
        <TimelineChart theme={theme} />
      </div>

      {/* Placeholder for future charts */}
      <div className="bg-gray-100 p-6 rounded-lg text-center italic text-gray-500">
        <p>This is a placeholder for the Timeline Chart and Comparison Graph.</p>
        <p>We can add more charts here in a future step!</p>
      </div>
    </div>
  );
};

export default Results;
