import calculateFCFS from './fcfs';
import calculateSJF from './SJF-Non-Preemitive';
import calculateSRTF from './SJF-Preemitive';
import calculatePriority from './Priority-Non-Preemitive';
import calculatePriorityPreemptive from "./Priority-Preemptive"
import calculateRoundRobin from './Round_Robin';


const algorithms = {
  FCFS: calculateFCFS,
  SJF_NonPreemptive: calculateSJF,
  SJF_Preemptive: calculateSRTF,
  Priority_NonPreemptive: calculatePriority,
  Priority_Preemptive: calculatePriorityPreemptive,
  RoundRobin: calculateRoundRobin,
};

export default algorithms;

