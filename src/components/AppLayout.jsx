import React, { useRef, useEffect } from 'react';
import { useSimulation } from '../store/SimulationContext';
import Header from './Header';

//import ProcessTable from './components/ProcessTable';
import Visualizer from './Visualizer';
import Results from './Results';
import Sidebar from './Sidebar';
import InputControls from './InputControls';
import AnimationProcessTable from './AnimationProcessTable';
import AnimationControls from './AnimationControl';



// Define the eye-comfortable light theme colors
const lightTheme = {
  background: '#F3F4F6', // A soft gray background
  surface: '#FFFFFF', // White for cards and components
  text: '#1F2937', // Dark gray for text
  accent: 'rgb(194, 97, 97)', // Your chosen accent color
};


const AppLayout = () => {
  const { uiMode, setAnimationRef, setResultsRef } = useSimulation();
  const animationRef = useRef(null);
  const resultsRef = useRef(null);

  // Set the refs in the context once the components are mounted
  useEffect(() => {
    setAnimationRef(animationRef);
    setResultsRef(resultsRef);
  }, [setAnimationRef, setResultsRef]);

  return (
    <div 
      className="min-h-screen font-sans transition-colors duration-500"
      style={{ backgroundColor: lightTheme.background, color: lightTheme.text }}
    >
      <Header/>
      <main className="flex flex-col min-h-screen pt-16">
        {/* Input View: Always at the top of the page */}
        <div className="min-h-screen flex flex-col md:flex-row" id="input-view">
          <div className='hidden md:flex'><Sidebar /></div>
          
          <InputControls />
        </div>
        
        {/* Animation View: Renders below the input view when the mode is 'animate' or 'plot' */}
        {uiMode === 'animate' /*['animate', 'plot'].includes(uiMode)*/  && (
          <div className="w-full flex flex-col items-center pt-8" ref={animationRef} id="animation-view">
            <div className="w-full max-w-7xl px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="hidden md:block md:col-span-1 max-h-96">
                  <AnimationProcessTable/>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
                  <h2 className="text-xl font-bold mb-4">Live Simulation</h2>
                  <Visualizer theme={lightTheme} />
                  <AnimationControls/>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results View: Renders below the animation view when the mode is 'plot' */}
        {['animate', 'plot'].includes(uiMode) /*uiMode === 'plot'*/ && (
          <div className="w-full flex flex-col items-center pt-8" ref={resultsRef} id="results-view">
            <div className="w-full max-w-7xl px-8">
              <Results theme={lightTheme} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AppLayout;