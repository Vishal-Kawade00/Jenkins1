import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import algorithms from "./algo"; // New central import

// Create a central context to hold all the simulation data and logic
const SimulationContext = createContext();

// Define a custom hook to provide easy access to the context
export const useSimulation = () => {
  return useContext(SimulationContext);
};

// Define the initial state for the reducer
const initialState = {
  processes: [],
  newProcess: { arrival: "", burst: "", priority: "" },
  algorithm: "FCFS",
  timeQuantum: 2,
  uiMode: "input", // 'input', 'animate', or 'plot'
  maxProcesses: 30,
  maxPriority: 30,
  maxArrivalTime: 200,
  maxBurstTime: 30,
  alert: { message: "", visible: false },
  simulation: {
    isPlaying: false,
    currentSlideIndex: 0,
    speed: 1000,
    metrics: {},
    steps: [],
    isComplete: false,
  },
};

// The reducer function to handle all state transitions
const simulationReducer = (state, action) => {
  const getAlgorithmFunction = () => {
    return algorithms[state.algorithm];
  };

  switch (action.type) {
    case "ADD_PROCESS":
      return {
        ...state,
        processes: [...state.processes, action.payload],
        newProcess: initialState.newProcess,
        simulation: initialState.simulation,
      };
    case "ADD_MULTIPLE_PROCESSES":
      return {
        ...state,
        processes: [...state.processes, ...action.payload],
        simulation: initialState.simulation,
      };
    case "REMOVE_PROCESS":
      return {
        ...state,
        processes: state.processes.filter((p) => p.id !== action.payload),
        simulation: initialState.simulation,
      };
    case "SET_NEW_PROCESS_FIELD":
      return {
        ...state,
        newProcess: {
          ...state.newProcess,
          [action.payload.field]: action.payload.value,
        },
      };
    case "SET_ALGORITHM":
      return {
        ...state,
        algorithm: action.payload,
        simulation: initialState.simulation,
      };
      case "SET_TIME_QUANTUM":
      return {
        ...state,
        timeQuantum: action.payload,
        // simulation: initialState.simulation, // Reset simulation when time quantum changes
      };
    case "START_ANIMATION":
      if (state.processes.length === 0) {
        return {
          ...state,
          alert: {
            message: "Please add processes to run the simulation.",
            visible: true,
          },
        };
      }
      const selectedAlgoAnim = getAlgorithmFunction();
      const { timeline: animTimeline, metrics: animMetrics } = selectedAlgoAnim(
        state.processes,
        state.timeQuantum
      );
      return {
        ...state,
        uiMode: "animate",
        simulation: {
          ...initialState.simulation,
          isPlaying: true,
          metrics: animMetrics,
          steps: animTimeline,
        },
      };
    case "START_PLOT":
      if (state.processes.length === 0) {
        return {
          ...state,
          alert: {
            message: "Please add processes to run the simulation.",
            visible: true,
          },
        };
      }
      const selectedAlgoPlot = getAlgorithmFunction();
      const { timeline: plotTimeline, metrics: plotMetrics } = selectedAlgoPlot(
        state.processes,
        state.timeQuantum
      );
      return {
        ...state,
        uiMode: "plot",
        simulation: {
          ...initialState.simulation,
          metrics: plotMetrics,
          steps: plotTimeline,
          isComplete: true,
        },
      };

    case "TOGGLE_PLAYING":
      return {
        ...state,
        simulation: {
          ...state.simulation,
          isPlaying: !state.simulation.isPlaying && !state.simulation.isComplet
        },
      };

    case "RESET_SIMULATION":
      return { ...state, simulation: initialState.simulation, uiMode: "input" };

    case "NEXT_SLIDE":
      // console.log("hii");
      return {
        ...state,
        simulation: {
          ...state.simulation,
          currentSlideIndex: Math.min(
            state.simulation.currentSlideIndex + 1,
            state.simulation.steps.length - 1
          ),
          isComplete:
            state.simulation.currentSlideIndex + 1 >=
            state.simulation.steps.length,
        },
      };

    case "PREVIOUS_SLIDE":
      return {
        ...state,
        simulation: {
          ...state.simulation,
          isPlaying:false,
          currentSlideIndex: Math.max(
            state.simulation.currentSlideIndex - 1,
            0
          ),
          isComplete: false,
        },
      };

    case "SET_UI_MODE":
      return { ...state, uiMode: action.payload };
    case "SHOW_ALERT":
      return { ...state, alert: { message: action.payload, visible: true } };
    case "HIDE_ALERT":
      return { ...state, alert: { message: "", visible: false } };
    default:
      return state;
  }
};

// The provider component that uses the reducer
export const SimulationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(simulationReducer, initialState);
  const processIdCounter = useRef(1);
  const simulationIntervalRef = useRef(null);
  const animationRef = useRef(null);
  const resultsRef = useRef(null);

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const lightness = 70 + Math.random() * 10;
    return `hsl(${hue}, 70%, ${lightness}%)`;
  };

  const addProcess = () => {
    if (state.processes.length >= state.maxProcesses) {
      dispatch({
        type: "SHOW_ALERT",
        payload: `Max processes reached (${state.maxProcesses}). Cannot add more.`,
      });
      return;
    }
    const newBurst = parseInt(state.newProcess.burst, 10);
    if (newBurst > state.maxBurstTime) {
      dispatch({
        type: "SHOW_ALERT",
        payload: `Burst time exceeds maximum limit of ${state.maxBurstTime}.`,
      });
      return;
    }
    const newArrival = parseInt(state.newProcess.arrival, 10);

    if (isNaN(newArrival)) {
      dispatch({
        type: "SHOW_ALERT",
        payload: "Please enter a valid arrival time.",
      });
      return;
    }

    if (newArrival > state.maxArrivalTime) {
      dispatch({
        type: "SHOW_ALERT",
        payload: `Arrival time exceeds maximum limit of ${state.maxArrivalTime}.`,
      });
      return;
    }
    let newPriority = null;
    if (state.newProcess.priority !== "") {
      newPriority = parseInt(state.newProcess.priority, 10);
      if (newPriority > state.maxPriority) {
        dispatch({
          type: "SHOW_ALERT",
          payload: `Priority exceeds maximum limit of ${state.maxPriority}.`,
        });
        return;
      }
    }

    if (state.newProcess.arrival !== "" && state.newProcess.burst !== "") {
      const newProc = {
        ...state.newProcess,
        id: processIdCounter.current++,
        arrival: newArrival,
        burst: newBurst,
        priority: state.newProcess.priority !== "" ? newPriority : null,
        color: getRandomColor(),
      };
      dispatch({ type: "ADD_PROCESS", payload: newProc });
    }
  };

  const addMultipleProcesses = (newProcs) => {
    if (state.processes.length + newProcs.length > state.maxProcesses) {
      dispatch({
        type: "SHOW_ALERT",
        payload: `Cannot add all example processes. Max processes reached (${state.maxProcesses}).`,
      });
      return;
    }

    const validProcs = newProcs.filter((p) => p.burst <= state.maxBurstTime);
    if (validProcs.length < newProcs.length) {
      dispatch({
        type: "SHOW_ALERT",
        payload: `Some example processes were not added because their burst time exceeded the limit of ${state.maxBurstTime}.`,
      });
    }

    let nextId = processIdCounter.current;
    const processesToAdd = validProcs.map((p) => ({
      ...p,
      id: nextId++,
      color: getRandomColor(),
    }));
    processIdCounter.current = nextId;

    dispatch({ type: "ADD_MULTIPLE_PROCESSES", payload: processesToAdd });
  };

  const removeProcess = (id) => {
    dispatch({ type: "REMOVE_PROCESS", payload: id });
  };

  const setNewProcessField = (field, value) => {
    if (field === "burst" || field === "priority") {
      const numValue = parseInt(value, 10);
      if (numValue > state.maxBurstTime) {
        dispatch({
          type: "SHOW_ALERT",
          payload: `${field} exceeds maximum limit of ${state.maxBurstTime}.`,
        });
        return;
      }
      if (value === "" || (numValue >= 0 && !isNaN(numValue))) {
        dispatch({ type: "SET_NEW_PROCESS_FIELD", payload: { field, value } });
      }
    } else {
      dispatch({ type: "SET_NEW_PROCESS_FIELD", payload: { field, value } });
    }
  };

  const setAlgorithm = (algo) => {
    dispatch({ type: "SET_ALGORITHM", payload: algo });
  };

  const setTimeQuantum = (quantum) => {
    dispatch({ type: "SET_TIME_QUANTUM", payload: quantum });
  };

  const startAnimation = () => {
    dispatch({ type: "START_ANIMATION" });
  };

  const startPlot = () => {
    dispatch({ type: "START_PLOT" });
  };

  const resetSimulation = () => {
    dispatch({ type: "RESET_SIMULATION" });
  };

  const nextSlide = () => {
    // state.simulation.isPlaying = false;
    dispatch({type: "NEXT_SLIDE"})
  }

  const previousSlide = () => {
    // state.simulation.isPlaying = false;
    dispatch({type: "PREVIOUS_SLIDE"})
  }

  const togglePlaying = () => {                                 
    dispatch({type: "TOGGLE_PLAYING"})
  }

  const setUiMode = (mode) => {
    dispatch({ type: "SET_UI_MODE", payload: mode });
  };

  const closeAlert = () => {
    dispatch({ type: "HIDE_ALERT" });
  };

  const setAnimationRef = (ref) => {
    animationRef.current = ref.current;
  };

  const setResultsRef = (ref) => {
    resultsRef.current = ref.current;
  };

  useEffect(() => {
    if (state.simulation.isPlaying && !state.simulation.isComplete) {
      simulationIntervalRef.current = setInterval(() => {
        dispatch({ type: "NEXT_SLIDE" });
      }, state.simulation.speed);
    } else {
      clearInterval(simulationIntervalRef.current);
    }

    return () => clearInterval(simulationIntervalRef.current);
  }, [
    state.simulation.isPlaying,
    state.simulation.isComplete,
    state.simulation.speed,
    state.uiMode,
  ]);

  useEffect(() => {
    if (state.uiMode === "animate" && animationRef.current) {
      animationRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (state.uiMode === "plot" && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.uiMode]);

  const value = {
    ...state,
    setNewProcessField,
    setAlgorithm,
    setTimeQuantum,
    addProcess,
    addMultipleProcesses,
    removeProcess,
    startAnimation,
    startPlot,
    resetSimulation,
    setUiMode,
    setAnimationRef,
    setResultsRef,
    closeAlert,
    nextSlide,
    previousSlide,
    togglePlaying,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};
