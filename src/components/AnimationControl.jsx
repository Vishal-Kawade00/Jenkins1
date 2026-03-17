import React, { useEffect } from 'react';
import { useSimulation } from '../store/SimulationContext';

const AnimationControls = () => {
  const { simulation, nextSlide, previousSlide, togglePlaying } = useSimulation();
  const { currentSlideIndex, steps, isPlaying, isComplete } = simulation;

  const currentSlide = steps[currentSlideIndex];
  const simTime = currentSlide ? currentSlide.time : 0;
  const isBackwardDisabled = currentSlideIndex === 0;
  const isForwardDisabled = currentSlideIndex >= steps.length || isComplete;
  const isAutoplayDisabled = steps.length === 0 || isComplete;

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mt-4">
      
      <div className="flex space-x-2">
        <button
          onClick={previousSlide}
          disabled={isBackwardDisabled}
          className={`px-4 py-2 rounded-md font-semibold text-white transition-colors ${isBackwardDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
        >
          Backward
        </button>
        <button
          onClick={togglePlaying}
          disabled={isAutoplayDisabled}
          className={`px-4 py-2 rounded-md font-semibold text-white transition-colors ${isAutoplayDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={nextSlide}
          disabled={isForwardDisabled}
          className={`px-4 py-2 rounded-md font-semibold text-white transition-colors ${isForwardDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
        >
          Forward
        </button>
      </div>
      <div className="text-sm font-semibold text-gray-500">
        {currentSlideIndex}/{steps.length-1}
      </div>
      <div className="text-xl font-bold text-gray-700">
        Time: {simTime}
      </div>
    </div>
  );
};

export default AnimationControls;
