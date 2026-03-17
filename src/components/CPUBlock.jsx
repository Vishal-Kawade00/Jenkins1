import React from 'react';
import { useSimulation } from '../store/SimulationContext';
import { motion, AnimatePresence } from 'framer-motion';

const CPUBlock = () => {
  // Get the current CPU process from the central simulation state
  const { simulation } = useSimulation();
  const currentSlide = simulation.steps[simulation.currentSlideIndex];
  const cpu = currentSlide ? currentSlide.cpu : null;
  
  return (
    <div className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-300 min-h-[100px] min-w-[150px]">
      <h3 className="font-bold mb-1">CPU</h3>
      <div className="min-h-[100px] flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {cpu ? (
            <motion.div
              key={cpu.id}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ backgroundColor: cpu.color }}
              className="p-2 w-20 h-20 text-center rounded-full font-bold text-white shadow-lg flex items-center justify-center cursor-pointer"
            >
              P{cpu.id}
            </motion.div>
          ) : (
            <motion.div
              key="cpu-idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center italic text-gray-500 text-sm"
            >
              Idle
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CPUBlock;
