import { useState, useRef } from "react";

// useTimer: stopwatch state (time, laps) & controls
// NOTE: giữ active.current.disabled + isStart (useRef) theo skeleton; refactor sang isRunning(useState) sau release v1.0
const useTimer = (ini = 0) => {
  // --- state ---
  const [time, setTime] = useState(ini);
  const [laps, setLaps] = useState([]);

  // --- refs (DOM & runtime flags, không trigger re-render) ---
  const isStart = useRef(false);
  const active = useRef(null);
  const refInterval = useRef(null);

  // --- handlers ---
  const startTimer = () => {
    if (!refInterval.current) {
      refInterval.current = setInterval(
        () => setTime((prev) => prev + 1),
        1000
      );
      if (active.current) active.current.disabled = true; // chặn spam Start
      isStart.current = true;
    }
  };

  const stopTimer = () => {
    clearInterval(refInterval.current);
    refInterval.current = null;
    if (active.current) active.current.disabled = false;
    isStart.current = false;
  };

  const resetTimer = () => {
    clearInterval(refInterval.current);
    refInterval.current = null;
    setTime(0);
    setLaps([]); // reset = xoá lịch sử laps (stopwatch phổ biến)
    if (active.current) active.current.disabled = false;
    isStart.current = false;
  };

  const splitTimer = () => setLaps((prev) => [...prev, time]); // thêm mốc thời gian

  // --- public API ---
  return {
    time,
    laps,
    startTimer,
    stopTimer,
    resetTimer,
    splitTimer,
    active,
    isStart,
  };
};

export default useTimer;
