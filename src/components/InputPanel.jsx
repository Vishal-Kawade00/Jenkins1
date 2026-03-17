import React from 'react';
import { useSimulation } from '../store/SimulationContext';
import ExampleProcessSelector from './ExampleProcessSelector';

const InputPanel = () => {
  // Use the custom hook to access state and action dispatchers from the central store
  const { newProcess, setNewProcessField, addProcess, algorithm } = useSimulation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // We allow an empty string or non-negative number
    if (value === '' || (Number(value) >= 0 && !isNaN(Number(value)))) {
      setNewProcessField(name, value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Process Input</h2>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <ExampleProcessSelector />
        {/* Input for Arrival Time */}
        <input
          type="number"
          min="0"
          name="arrival"
          placeholder="Arrival Time (ms)"
          value={newProcess.arrival}
          onChange={handleInputChange}
          className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(194,97,97)] focus:border-[rgb(194,97,97)]"
          // style={{ borderColor: 'rgb(229, 231, 235)', focusColor: 'rgb(194, 97, 97)' }}
        />
        {/* Input for Burst Time */}
        <input
          type="number"
          min="0"
          name="burst"
          placeholder="Burst Time (ms)"
          value={newProcess.burst}
          onChange={handleInputChange}
          className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(194,97,97)] focus:border-[rgb(194,97,97)]"
          // style={{ borderColor: 'rgb(229, 231, 235)', focusColor: 'rgb(194, 97, 97)' }}
        />
        {/* Conditionally rendered input for Priority */}
        {algorithm.includes('Priority') && (
          <input
            type="number"
            min="0"
            max="200"
            name="priority"
            placeholder="Priority (lower is higher)"
            value={newProcess.priority}
            onChange={handleInputChange}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(194,97,97)] focus:border-[rgb(194,97,97)]"
            // style={{ borderColor: 'rgb(229, 231, 235)', focusColor: 'rgb(194, 97, 97)' }}
          />
        )}
      </div>
      <button
        onClick={addProcess}
        
        className="w-full px-4 py-3 text-white bg-green-800 font-semibold rounded-md hover:opacity-90 transition-opacity"
      >
        Add Process
      </button>
    </div>
  );
};

export default InputPanel;
