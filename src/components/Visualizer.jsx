import React from "react";
import { useSimulation } from "../store/SimulationContext";
import ReadyQueue from "./ReadyQueue";
import CPUBlock from "./CPUBlock";
import CompletionQueue from "./CompletionQueue";
import GanttChart from "./GanttChart";
import { motion, AnimatePresence } from "framer-motion";

const Visualizer = ({ theme }) => {
  const { simulation } = useSimulation();

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md min-h-[400px] flex flex-col"
      style={{ backgroundColor: theme.surface, color: theme.text }}
    >
      <div className="flex-1 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {simulation.isPlaying || simulation.steps.length > 0 ? (
            <motion.div
              key="animation-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 flex-1"
            >
              <div className="flex flex-col justify-evenly text-center space-y-2 w-full">
                <ReadyQueue />
                <CPUBlock />
                <CompletionQueue />
              </div>

              <GanttChart theme={theme} final={false}/>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder-content"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center justify-center text-center text-gray-500 italic"
            >
              Add processes and click "Animate" to begin.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Visualizer;
