import { useState, useRef } from "react";

const useTimer = (ini = 0) => {
  const [time, setTime] = useState(ini);

  const isStart = "Your code here";
  const active = useRef(null);
  const refInterval = useRef(null);

  const startTimer = () => {
    if (!refInterval.current) {
      refInterval.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      console.log(refInterval.current);
      active.current.disabled = true;
    }
  };
  const stopTimer = () => {
    clearInterval(refInterval.current);
    console.log(refInterval.current);
    refInterval.current = null;
    if (active.current) active.current.disabled = false;
  };
  const resetTimer = () => {
    clearInterval(refInterval.current);
    refInterval.current = null;
    setTime(0);
    if (active.current) active.current.disabled = false;
  };

  return { time, startTimer, active, stopTimer, resetTimer };
};

export default useTimer;
