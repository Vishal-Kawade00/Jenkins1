import React from "react";
import { useSimulation } from "../store/SimulationContext";

const exampleProcesses = [
  {
    label: "Example 1 (3 processes)",
    processes: [
      { arrival: 0, burst: 10, priority: 7 },
      { arrival: 1, burst: 5, priority: 14 },
      { arrival: 2, burst: 8, priority: 21 },
    ],
  },
  {
    label: "Example 2 (4 processes)",
    processes: [
      { arrival: 0, burst: 5, priority: 8 },
      { arrival: 2, burst: 3, priority: 15 },
      { arrival: 4, burst: 6, priority: 22 },
      { arrival: 6, burst: 2, priority: 29 },
    ],
  },
  {
    label: "Example 3 (5 processes)",
    processes: [
      { arrival: 0, burst: 8, priority: 5 },
      { arrival: 1, burst: 4, priority: 11 },
      { arrival: 2, burst: 9, priority: 17 },
      { arrival: 3, burst: 5, priority: 23 },
      { arrival: 4, burst: 2, priority: 29 },
    ],
  },
  {
    label: "Example 1 (28 processes)",
    processes: [
      { arrival: 5, burst: 15, priority: 1 },
      { arrival: 18, burst: 28, priority: 2 },
      { arrival: 30, burst: 4, priority: 3 },
      { arrival: 25, burst: 29, priority: 4 },
      { arrival: 5, burst: 16, priority: 5 },
      { arrival: 22, burst: 11, priority: 6 },
      { arrival: 3, burst: 22, priority: 7 },
      { arrival: 0, burst: 7, priority: 8 },
      { arrival: 22, burst: 22, priority: 9 },
      { arrival: 21, burst: 19, priority: 10 },
      { arrival: 16, burst: 14, priority: 11 },
      { arrival: 19, burst: 18, priority: 12 },
      { arrival: 24, burst: 20, priority: 13 },
      { arrival: 17, burst: 29, priority: 14 },
      { arrival: 8, burst: 1, priority: 15 },
      { arrival: 21, burst: 18, priority: 16 },
      { arrival: 3, burst: 3, priority: 17 },
      { arrival: 22, burst: 22, priority: 18 },
      { arrival: 23, burst: 30, priority: 19 },
      { arrival: 6, burst: 17, priority: 20 },
      { arrival: 13, burst: 19, priority: 21 },
      { arrival: 15, burst: 2, priority: 22 },
      { arrival: 25, burst: 20, priority: 23 },
      { arrival: 10, burst: 21, priority: 24 },
      { arrival: 3, burst: 9, priority: 25 },
      { arrival: 22, burst: 26, priority: 26 },
      { arrival: 8, burst: 14, priority: 27 },
      { arrival: 12, burst: 20, priority: 28 },
    ],
  },
  {
    label: "Example 2 (19 processes)",
    processes: [
      { arrival: 17, burst: 12, priority: 1 },
      { arrival: 19, burst: 22, priority: 2 },
      { arrival: 16, burst: 1, priority: 3 },
      { arrival: 2, burst: 28, priority: 4 },
      { arrival: 24, burst: 10, priority: 5 },
      { arrival: 28, burst: 2, priority: 6 },
      { arrival: 4, burst: 7, priority: 7 },
      { arrival: 27, burst: 26, priority: 8 },
      { arrival: 5, burst: 5, priority: 9 },
      { arrival: 0, burst: 26, priority: 10 },
      { arrival: 27, burst: 9, priority: 11 },
      { arrival: 24, burst: 26, priority: 12 },
      { arrival: 19, burst: 22, priority: 13 },
      { arrival: 5, burst: 25, priority: 14 },
      { arrival: 15, burst: 8, priority: 15 },
      { arrival: 27, burst: 22, priority: 16 },
      { arrival: 30, burst: 15, priority: 17 },
      { arrival: 23, burst: 17, priority: 18 },
      { arrival: 7, burst: 23, priority: 19 },
    ],
  },
  {
    label: "Example 4 (18 processes)",
    processes: [
      { arrival: 23, burst: 28, priority: 1 },
      { arrival: 14, burst: 25, priority: 2 },
      { arrival: 0, burst: 13, priority: 3 },
      { arrival: 30, burst: 27, priority: 4 },
      { arrival: 8, burst: 17, priority: 5 },
      { arrival: 29, burst: 15, priority: 6 },
      { arrival: 23, burst: 3, priority: 7 },
      { arrival: 30, burst: 26, priority: 8 },
      { arrival: 17, burst: 2, priority: 9 },
      { arrival: 4, burst: 23, priority: 10 },
      { arrival: 24, burst: 13, priority: 11 },
      { arrival: 20, burst: 14, priority: 12 },
      { arrival: 1, burst: 18, priority: 13 },
      { arrival: 14, burst: 27, priority: 14 },
      { arrival: 25, burst: 7, priority: 15 },
      { arrival: 23, burst: 13, priority: 16 },
      { arrival: 28, burst: 5, priority: 17 },
      { arrival: 14, burst: 25, priority: 18 },
    ],
  },
  {
    label: "Example 5 (30 processes)",
    processes: [
      { arrival: 27, burst: 3, priority: 1 },
      { arrival: 22, burst: 24, priority: 2 },
      { arrival: 23, burst: 17, priority: 3 },
      { arrival: 19, burst: 5, priority: 4 },
      { arrival: 6, burst: 26, priority: 5 },
      { arrival: 15, burst: 5, priority: 6 },
      { arrival: 10, burst: 22, priority: 7 },
      { arrival: 10, burst: 15, priority: 8 },
      { arrival: 15, burst: 17, priority: 9 },
      { arrival: 18, burst: 30, priority: 10 },
      { arrival: 28, burst: 17, priority: 11 },
      { arrival: 29, burst: 14, priority: 12 },
      { arrival: 12, burst: 18, priority: 13 },
      { arrival: 18, burst: 10, priority: 14 },
      { arrival: 6, burst: 3, priority: 15 },
      { arrival: 0, burst: 19, priority: 16 },
      { arrival: 8, burst: 23, priority: 17 },
      { arrival: 18, burst: 14, priority: 18 },
      { arrival: 5, burst: 7, priority: 19 },
      { arrival: 7, burst: 14, priority: 20 },
      { arrival: 23, burst: 11, priority: 21 },
      { arrival: 20, burst: 18, priority: 22 },
      { arrival: 29, burst: 14, priority: 23 },
      { arrival: 23, burst: 12, priority: 24 },
      { arrival: 20, burst: 14, priority: 25 },
      { arrival: 9, burst: 18, priority: 26 },
      { arrival: 22, burst: 5, priority: 27 },
      { arrival: 7, burst: 27, priority: 28 },
      { arrival: 28, burst: 5, priority: 29 },
      { arrival: 14, burst: 15, priority: 30 },
    ],
  },

  {
    label: "Example 6 (6 processes)",
    processes: [
      { arrival: 1, burst: 7, priority: 18 },
      { arrival: 3, burst: 4, priority: 5 },
      { arrival: 5, burst: 6, priority: 29 },
      { arrival: 7, burst: 3, priority: 14 },
      { arrival: 9, burst: 8, priority: 21 },
      { arrival: 11, burst: 2, priority: 1 },
    ],
  },

  {
    label: "Example 7 (10 processes)",
    processes: [
      { arrival: 0, burst: 10, priority: 4 },
      { arrival: 1, burst: 5, priority: 30 },
      { arrival: 2, burst: 8, priority: 11 },
      { arrival: 3, burst: 6, priority: 22 },
      { arrival: 4, burst: 7, priority: 2 },
      { arrival: 6, burst: 4, priority: 27 },
      { arrival: 8, burst: 3, priority: 13 },
      { arrival: 10, burst: 9, priority: 19 },
      { arrival: 12, burst: 2, priority: 8 },
      {  arrival: 14, burst: 5, priority: 16 },
    ],
  },

  {
    label: "Example 8 (15 processes)",
    processes: [
      { arrival: 0, burst: 6, priority: 10 },
      { arrival: 1, burst: 3, priority: 23 },
      { arrival: 2, burst: 12, priority: 5 },
      { arrival: 3, burst: 8, priority: 17 },
      { arrival: 4, burst: 15, priority: 30 },
      { arrival: 5, burst: 7, priority: 2 },
      { arrival: 6, burst: 10, priority: 28 },
      { pid: 8, arrival: 7, burst: 4, priority: 9 },
      { arrival: 8, burst: 6, priority: 20 },
      {  arrival: 9, burst: 5, priority: 13 },
      {  arrival: 10, burst: 11, priority: 7 },
      {  arrival: 11, burst: 9, priority: 25 },
      {  arrival: 12, burst: 14, priority: 1 },
      {  arrival: 13, burst: 3, priority: 21 },
      {  arrival: 14, burst: 2, priority: 15 },
    ],
  },

  {
    label: "Example 9 (20 processes)",
    processes: [
      { arrival: 0, burst: 4, priority: 19 },
      { arrival: 1, burst: 9, priority: 8 },
      { arrival: 2, burst: 7, priority: 29 },
      { arrival: 3, burst: 3, priority: 5 },
      { arrival: 4, burst: 6, priority: 17 },
      { arrival: 5, burst: 2, priority: 13 },
      { arrival: 6, burst: 10, priority: 30 },
      { arrival: 7, burst: 8, priority: 3 },
      { arrival: 8, burst: 12, priority: 21 },
      {  arrival: 9, burst: 5, priority: 11 },
      { arrival: 10, burst: 14, priority: 24 },
      { pid: 12, arrival: 11, burst: 6, priority: 6 },
      {  arrival: 12, burst: 9, priority: 20 },
      {  arrival: 13, burst: 4, priority: 15 },
      {  arrival: 14, burst: 7, priority: 1 },
      {  arrival: 15, burst: 11, priority: 26 },
      {  arrival: 16, burst: 13, priority: 2 },
      {  arrival: 17, burst: 3, priority: 27 },
      {  arrival: 18, burst: 8, priority: 9 },
      {  arrival: 19, burst: 15, priority: 12 },
    ],
  },

  {
    label: "Example 10 (12 processes)",
    processes: [
      { arrival: 0, burst: 5, priority: 12 },
      { arrival: 2, burst: 3, priority: 18 },
      { arrival: 7, burst: 4, priority: 25 },
      { arrival: 15, burst: 6, priority: 5 },
      { arrival: 16, burst: 8, priority: 22 },
      { arrival: 25, burst: 10, priority: 7 },
      { arrival: 27, burst: 2, priority: 14 },
      { arrival: 40, burst: 12, priority: 30 },
      { arrival: 41, burst: 3, priority: 11 },
      {  arrival: 55, burst: 7, priority: 19 },
      {  arrival: 60, burst: 5, priority: 8 },
      { pid: 12, arrival: 75, burst: 9, priority: 20 },
    ],
  },
];

const ExampleProcessSelector = () => {
  const { addMultipleProcesses } = useSimulation();

  const handleSelectExample = (event) => {
    const selectedLabel = event.target.value;
    if (selectedLabel) {
      const selectedExample = exampleProcesses.find(
        (ex) => ex.label === selectedLabel
      );
      if (selectedExample) {
        // Use the correct function to add the entire array of processes
        addMultipleProcesses(selectedExample.processes);
      }
    }
  };

  return (
    <select
      onChange={handleSelectExample}
      className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(194,97,97)] focus:border-[rgb(194,97,97)] "
      // style={{
      //   borderColor: "rgb(229, 231, 235)",
      //   focusColor: "rgb(194, 97, 97)",
      // }}
      defaultValue=""
    >
      <option value="" disabled>
        Select a set of example processes
      </option>
      {exampleProcesses.map((example) => (
        <option key={example.label} value={example.label}>
          {example.label}
        </option>
      ))}
    </select>
  );
};

export default ExampleProcessSelector;
