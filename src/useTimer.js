import { useState, useRef, useEffect } from "react";

// useTimer: stopwatch state (time, laps) & controls
const useTimer = (ini = 0) => {
  // --- state ---
  const [time, setTime] = useState(ini);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // --- ref ---
  const refInterval = useRef(null);

  // effect: run/stop interval when isRunning changes
  useEffect(() => {
    if (isRunning) {
      refInterval.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(refInterval.current);
      refInterval.current = null;
    }

    // cleanup on unmount
    return () => clearInterval(refInterval.current);
  }, [isRunning]);

  // --- handlers ---
  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };
  const splitTimer = () => setLaps((prev) => [...prev, time]);

  return {
    time,
    laps,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    splitTimer,
  };
};

export default useTimer;
