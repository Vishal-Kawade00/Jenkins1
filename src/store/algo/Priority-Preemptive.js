const calculatePriorityPreemptive = (inputProcesses) => {
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

  // Helper function to find highest priority process
  const findHighestPriorityProcess = () => {
    if (readyQueue.length === 0) return null;
    
    let highestPriority = readyQueue[0];
    for (let i = 1; i < readyQueue.length; i++) {
      if (readyQueue[i].priority < highestPriority.priority) {
        // Lower number = higher priority
        highestPriority = readyQueue[i];
      } else if (readyQueue[i].priority === highestPriority.priority) {
        // Tie-breaker: FCFS (arrival time)
        if (readyQueue[i].arrival < highestPriority.arrival) {
          highestPriority = readyQueue[i];
        }
      }
    }
    return highestPriority;
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
      takeSnapshot();
    }

    // Phase 3: Check for Preemption and Schedule (Priority Preemptive Logic)
    if (readyQueue.length > 0) {
      const highestPriorityProcess = findHighestPriorityProcess();
      
      // Preemption check: if a higher priority process is available or CPU is free
      if (cpu === null || highestPriorityProcess.priority < cpu.priority) {
        
        // If CPU is not free, preempt current process
        if (cpu !== null) {
          // Close current gantt chart entry
          ganttChart[ganttChart.length - 1].end = currentTime;
          
          // Put current process back to ready queue
          readyQueue.push(cpu);
          takeSnapshot();
        }
        
        // Remove highest priority process from ready queue
        const index = readyQueue.indexOf(highestPriorityProcess);
        readyQueue.splice(index, 1);
        
        // Schedule the highest priority process
        cpu = highestPriorityProcess;
        
        // Set the start time for first time scheduling
        if (cpu.startTime === undefined) {
          cpu.startTime = currentTime;
        }
        
        // Start new gantt chart entry - using 'id' instead of 'pid'
        ganttChart.push({ 
          id: cpu.pid || cpu.id, 
          start: currentTime, 
          end: currentTime + 1, 
          color: cpu.color 
        });
        takeSnapshot();
      }
    }
    
    // Phase 4: Handle Idle Time
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

    // Phase 5: Advance time and decrement burst
    if (cpu) {
      cpu.remainingBurstTime--;
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
  };

  return { timeline, metrics };
};


export default calculatePriorityPreemptive;