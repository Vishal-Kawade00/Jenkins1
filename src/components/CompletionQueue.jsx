import React from "react";
import { useSimulation } from "../store/SimulationContext";
import { motion, AnimatePresence } from "framer-motion";

const CompletionQueue = () => {
  // Get the completed queue from the central simulation state
  const { simulation } = useSimulation();
  const currentSlide = simulation.steps[simulation.currentSlideIndex];
  const completedQueue = currentSlide ? currentSlide.completed : [];

  return (
    <div className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-300 min-w-[150px] overflow-y-auto min-h-[120px]">
      <h3 className="font-bold">Completed</h3>
      <div className="flex items-center w-full overflow-y-auto">
        <AnimatePresence>
          {completedQueue.length > 0 ? (
            completedQueue.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
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

export default CompletionQueue;
