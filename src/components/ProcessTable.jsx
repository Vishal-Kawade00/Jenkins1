import React from 'react';
import { useSimulation } from '../store/SimulationContext';

const ProcessTable = () => {
  // Use the custom hook to access state and action dispatchers from the central store
  const { processes, removeProcess, algorithm } = useSimulation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Processes</h2>
      <div className="max-h-99 overflow-y-auto">
        {processes.length === 0 ? (
          <p className="text-center italic text-gray-500">No processes added yet. Please add some to begin.</p>
        ) : (
          <table className="min-w-full text-left table-auto">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-4 py-2 text-gray-600">ID</th>
                <th className="px-4 py-2 text-gray-600">Arrival</th>
                <th className="px-4 py-2 text-gray-600">Burst</th>
                {/* Conditionally render the Priority column */}
                {algorithm.includes('Priority') && (
                  <th className="px-4 py-2 text-gray-600">Priority</th>
                )}
                  <th className="px-4 py-2 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {processes.map(p => (
                <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.arrival}</td>
                  <td className="px-4 py-2">{p.burst}</td>
                  {algorithm.includes('Priority') && (
                    <td className="px-4 py-2">{p.priority || '-'}</td>
                  )}
                  
                    <td className="px-4 py-2">
                      <button 
                        onClick={() => removeProcess(p.id)} 
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label={`Remove process P${p.id}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProcessTable;
