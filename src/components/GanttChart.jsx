import React from "react";
import { useSimulation } from "../store/SimulationContext";
import { motion, AnimatePresence } from "framer-motion";

const GanttChart = ({final}) => {
  // Get the gantt chart timeline from the central simulation state
  const { simulation } = useSimulation();
  let currentSlide = [];
  if(final){
    currentSlide = simulation.steps[simulation.steps.length -1]
  }
  else{
    currentSlide = simulation.steps[simulation.currentSlideIndex];
  }
  const ganttChart = currentSlide ? currentSlide.gantt : [];
  const maxTime =
    ganttChart.length > 0 ? ganttChart[ganttChart.length - 1].end : 0;

  const getWidth = (entry) => {
    const scale = 20;
    if (maxTime === 0) return "0%";
    return Math.max((entry.end - entry.start) * scale, 30);
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-300 overflow-x-auto min-h-[150px]">
      <h3 className="font-bold mb-2">Gantt Chart</h3>
      <div className="w-full overflow-x-auto">
        <div className="flex items-end w-full min-w-max p-2 pb-8">
          <AnimatePresence>
            {ganttChart.map((entry, index) => (
              <motion.div
                key={`${entry.id}-${entry.start}-${index}`}
                layout
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  backgroundColor: entry.color || "#A0A0A0",
                  width: Math.max(getWidth(entry),30),
                  transformOrigin: "left",
                }}
                className="h-10 p-1 text-white flex items-center justify-center font-bold relative group border-l border-gray-400 text-sm min-w-[30px]"
              >
                <span className="text-white font-bold text-center min-w-20 whitespace-nowrap overflow-hidden text-ellipsis">
                  {entry.id !== 'idle' ? "P"+entry.id : "Idle"}
                </span>
                <div className="absolute -bottom-6 left-0 text-xs p-1 text-gray-900">
                  {entry.start}
                </div>
              </motion.div>
            ))}
            {/* Display the final timestamp */}
            {ganttChart.length > 0 && (
              <div className="h-10 relative flex-shrink-0">
                <div className="absolute -bottom-6 font-bold text-xs p-1 text-gray-900">
                  {ganttChart[ganttChart.length - 1].end}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;