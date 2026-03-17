import React from 'react';
import { useSimulation } from '../store/SimulationContext';
import { motion, AnimatePresence } from 'framer-motion';

const ReadyQueue = () => {
  // Get the ready queue from the central simulation state
  const { simulation } = useSimulation();
  const currentSlide = simulation.steps[simulation.currentSlideIndex];
  const readyQueue = currentSlide ? currentSlide.readyQueue : [];

  return (
    <div className="flex flex-col items-center p-3 rounded-lg border-2 border-gray-300 min-w-[150px] min-h-[120px]">
      <h3 className="font-bold ">Ready Queue</h3>
      <div className=" flex flex-row-reverse w-full items-center overflow-y-auto">
        <AnimatePresence>
          {readyQueue.length > 0 ? (
            readyQueue.map(p => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{ backgroundColor: p.color }}
                className="p-2 w-16 text-center rounded-md m-1 font-bold text-white shadow-md cursor-pointer"
              >
                P{p.id}
              </motion.div>
            ))
          ) : (
            <motion.div
              key="empty-queue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center italic text-gray-500 m-0 text-sm w-full"
            >
              <center>Empty</center>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReadyQueue;
