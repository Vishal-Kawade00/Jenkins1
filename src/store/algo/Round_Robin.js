const calculateRoundRobin = (inputProcesses, timeQuantum) => {
  if (!inputProcesses || inputProcesses.length === 0) {
    return { timeline: [], metrics: {} };
  }

  // Deep copy to avoid mutating original
  const processes = JSON.parse(JSON.stringify(inputProcesses));

  // Sort processes by arrival time initially
  processes.sort((a, b) => a.arrival - b.arrival);

  const timeline = [];
  let completedProcesses = [];
  let readyQueue = [];
  let ganttChart = [];

  let currentTime = 0;
  let unarrivedCount = 0;
  let cpu = null;
  let timeSliceRemaining = 0; // Track remaining time slice for current process

  // Add remainingBurstTime for simulation
  processes.forEach((p) => (p.remainingBurstTime = p.burst));

  const takeSnapshot = () => {
    const currentSnapshot = {
      time: currentTime,
      cpu: cpu ? { ...cpu } : null,
      readyQueue: [...readyQueue],
      completed: completedProcesses.map((p) => ({ ...p })),
      remaining: processes.map((p) => ({ ...p })),
      gantt: ganttChart.map((p) => ({ ...p })),
    };
    timeline.push(currentSnapshot);
  };

  // Main simulation loop
  while (completedProcesses.length < processes.length || unarrivedCount < processes.length || cpu !== null || readyQueue.length > 0) {
    
    // Phase 1: Check for Arrivals
    while (unarrivedCount < processes.length && processes[unarrivedCount].arrival === currentTime) {
      readyQueue.push(processes[unarrivedCount]);
      readyQueue[readyQueue.length - 1].index = unarrivedCount;
      unarrivedCount++;
      takeSnapshot();
    }

    // Phase 2: Check for Completion
    if (cpu && cpu.remainingBurstTime <= 0) {
      ganttChart[ganttChart.length - 1].end = currentTime;

      cpu.completionTime = currentTime;
      cpu.turnaroundTime = cpu.completionTime - cpu.arrival;
      cpu.waitingTime = cpu.turnaroundTime - cpu.burst;
      cpu.responseTime = cpu.startTime - cpu.arrival;

      completedProcesses.push(cpu);
      cpu = null;
      timeSliceRemaining = 0;
      takeSnapshot();
    }

    // Phase 3: Check for Time Quantum Expiry (PREEMPTIVE Round Robin Logic)
    if (cpu && timeSliceRemaining <= 0 && cpu.remainingBurstTime > 0) {
      // PREEMPTION: Time quantum expired, forcibly preempt the running process
      ganttChart[ganttChart.length - 1].end = currentTime;
      
      // Put preempted process back to ready queue (at the end for fairness)
      readyQueue.push(cpu);
      cpu = null;
      timeSliceRemaining = 0;
      takeSnapshot();
    }

    // Phase 4: Schedule New Process (Round Robin - FCFS from ready queue)
    if (cpu === null && readyQueue.length > 0) {
      // Take the first process from ready queue (FCFS order)
      cpu = readyQueue.shift();
      
      // Set the start time for first time scheduling
      if (cpu.startTime === undefined) {
        cpu.startTime = currentTime;
      }
      
      // Reset time slice for new process
      timeSliceRemaining = timeQuantum;
      
      // Start new gantt chart entry - using 'id' instead of 'pid'
      ganttChart.push({ 
        id: cpu.pid || cpu.id, 
        start: currentTime, 
        end: currentTime + 1, 
        color: cpu.color 
      });
      takeSnapshot();
    }
    
    // Phase 5: Handle Idle Time
    if (cpu === null) {
      if (ganttChart.length === 0 || ganttChart[ganttChart.length - 1].id !== 'idle') {
        ganttChart.push({ 
          id: 'idle', 
          start: currentTime, 
          end: currentTime + 1, 
          color: '#e0e0e0' 
        });
      }
      takeSnapshot();
    }

    // Phase 6: Advance time and execute process
    if (cpu) {
      cpu.remainingBurstTime--;
      timeSliceRemaining--;
      processes[cpu.index].remainingBurstTime = cpu.remainingBurstTime;
      // Only extend the gantt chart if a process is running
      ganttChart[ganttChart.length - 1].end = currentTime + 1;
    } else {
      // If CPU is idle, extend the idle entry
      if (ganttChart.length > 0 && ganttChart[ganttChart.length - 1].id === 'idle') {
        ganttChart[ganttChart.length - 1].end = currentTime + 1;
      }
    }
    
    currentTime++;
  }

  // Final metrics
  const totals = completedProcesses.reduce((acc, p) => {
    acc.turnaround += p.turnaroundTime;
    acc.waiting += p.waitingTime;
    acc.response += p.responseTime;
    acc.burst += p.burst;
    return acc;
  }, { turnaround: 0, waiting: 0, response: 0, burst: 0 });

  const totalTurnaround = totals.turnaround;
  const totalWaiting = totals.waiting;
  const totalResponse = totals.response;
  const totalBurst = totals.burst;
  const finalTime = currentTime - 1;

  const metrics = {
    detailedResults: completedProcesses.map(p => ({ ...p })),
    avgWaitingTime: totalWaiting / processes.length,
    avgTurnaroundTime: totalTurnaround / processes.length,
    avgResponseTime: totalResponse / processes.length,
    cpuUtilization: (totalBurst / finalTime) * 100,
    throughput: processes.length / finalTime,
    timeQuantum: timeQuantum, // Include time quantum in metrics
  };

  return { timeline, metrics };
};

export default calculateRoundRobin;