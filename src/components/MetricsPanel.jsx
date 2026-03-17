import React from "react";
import { useSimulation } from "../store/SimulationContext";

const MetricsPanel = ({ theme }) => {
  // Get the final metrics from the central simulation state
  const { simulation } = useSimulation();

  return (
    <div
      className="bg-white p-4 pt-0 rounded-lg shadow-md"
      style={{ backgroundColor: theme.surface, color: theme.text }}
    >
      <div className="flex flex-wrap justify-between text-center">
        <div>
          <p className="font-bold">Avg. Waiting Time</p>
          <p className="text-2xl font-semibold text-gray-500">
            {(simulation.metrics.avgWaitingTime ?? 0).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="font-bold">Avg. Turnaround Time</p>
          <p className="text-2xl font-semibold text-gray-500">
            {(simulation.metrics.avgTurnaroundTime ?? 0).toFixed(2)}
          </p>
        </div>
         <div>
          <p className="font-bold">Avg. Response Time</p>
          <p className="text-2xl font-semibold text-gray-500">
            {(simulation.metrics.avgResponseTime ?? 0).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="font-bold">CPU Utilization</p>
          <p className="text-2xl font-semibold text-gray-500">
            {(simulation.metrics.cpuUtilization ?? 0).toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="font-bold">Throughput</p>
          <p className="text-2xl font-semibold text-gray-500">
            {(simulation.metrics.throughput ?? 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Process Completion Table */}
      <h3 className="text-lg font-bold mt-8 mb-4">Process Completion Table</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left table-auto">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="px-4 py-2 text-gray-600 border-2 border-gray-400">
                PID
                <p className=" font-light text-[13px]">Process ID</p>
              </th>
              <th className="px-4 py-2 text-gray-600 border-2 border-gray-400">
                AT
                <p className=" font-light text-[13px]">Arrival Time</p>
              </th>
              <th className="px-4 py-2 text-gray-600 border-2 border-gray-400">
                BT
                <p className=" font-light text-[13px]">Burst Time</p>
              </th>
              <th className="px-4 py-2 text-gray-600 border-2 border-gray-400">
                ST
                <p className=" font-light text-[13px]">Start Time</p>
              </th>
              <th className="px-4 py-2 text-gray-600 border-2 border-gray-400">
                CT
                <p className=" font-light text-[13px]">Completion Time</p>
              </th>
              <th className="px-4 py-2 text-gray-600 border-2 border-gray-400">
                RT
                <p className=" font-light text-[13px]">Response Time</p>
              </th>
              <th className="px-4 py-2 text-gray-600 border-2 border-gray-400">
                WT
                <p className=" font-light text-[13px]">Waiting Time</p>
              </th>
              <th className="px-4 py-2 text-gray-600 border-2 border-gray-400">
                TAT
                <p className=" font-light text-[13px]">Turn-Around Time</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {simulation.metrics.detailedResults?.map((p) => (
              <tr key={p.id} className="border-b border-gray-200">
                <td className="px-4 py-2 border-2 border-gray-400">{`P${p.id}`}</td>
                <td className="px-4 py-2 border-2 border-gray-400">
                  {p.arrival}
                </td>
                <td className="px-4 py-2 border-2 border-gray-400">
                  {p.burst}
                </td>
                <td className="px-4 py-2 border-2 border-gray-400">
                  {p.startTime}
                </td>
                <td className="px-4 py-2 border-2 border-gray-400">
                  {p.completionTime}
                </td>
                <td className="px-4 py-2 border-2 border-gray-400">
                  {p.responseTime}
                </td>
                <td className="px-4 py-2 border-2 border-gray-400">
                  {p.waitingTime}
                </td>
                <td className="px-4 py-2 border-2 border-gray-400">
                  {p.turnaroundTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetricsPanel;
