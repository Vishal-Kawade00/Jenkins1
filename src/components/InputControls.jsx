import React from "react";
import InputPanel from "./InputPanel";
import AlgorithmSelector from "./AlgorithmSelector";
import SimulationButtons from "./SimulationButtons";
import ProcessTable from "./ProcessTable";

const InputControls = () => {
  return (
    <div className="p-4 w-full flex flex-col md:flex-row md:flex-wrap">
    <div className="p-4 w-full flex flex-col md:flex-row md:flex-wrap gap-4">
      {/* Simulation Settings Section */}
      <div className="flex flex-1 flex-col space-y-3 md:w-1/3">
        <AlgorithmSelector />
        <InputPanel />
        {/* <SimulationButtons /> */}
      </div>
       
      {/* Process Table Section */}
      <div className="flex-1 h-auto">
        <ProcessTable />
      </div>
      </div>
      <div className="flex-2">
        <SimulationButtons />
      </div>
    </div>
  );
};

export default InputControls;
