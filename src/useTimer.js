import { useState, useRef } from "react";

const useTimer = (ini = 0) => {
  const [time, setTime] = useState(ini);
  const [laps, setLaps] = useState([]);

  const active = useRef(null);
  const refInterval = useRef(null);

  const startTimer = () => {
    if (!refInterval.current) {
      refInterval.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      active.current.disabled = true;
    }
  };
  const stopTimer = () => {
    clearInterval(refInterval.current);
    refInterval.current = null;
    if (active.current) active.current.disabled = false;
  };
  const resetTimer = () => {
    clearInterval(refInterval.current);
    refInterval.current = null;
    setTime(0);
    setLaps([]);
    if (active.current) active.current.disabled = false;
  };
  const splitTimer = () => {
    setLaps((prev) => [...prev, time]);
  };

  return { time, laps, startTimer, active, stopTimer, resetTimer, splitTimer };
};

export default useTimer;
