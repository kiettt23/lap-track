import { useEffect, useState } from "react";
import useTimer from "./useTimer";
import { formatTime } from "./formatTime";

function App() {
  const {
    time,
    laps,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    splitTimer,
  } = useTimer(0);
  const [flashButton, setFlashButton] = useState("");

  // Keyboard shortcuts: Space(Start/Pause), R(Reset), L(Add Lap)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault(); // tránh scroll trang
        if (isRunning) {
          stopTimer();
          setFlashButton("pause");
        } else {
          startTimer();
          setFlashButton("start");
        }
      }
      if (e.code === "KeyR") {
        resetTimer();
        setFlashButton("reset");
      }
      if (e.code === "KeyL") {
        splitTimer();
        setFlashButton("lap");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isRunning, startTimer, stopTimer, resetTimer, splitTimer]);

  // Clear flash after 300ms
  useEffect(() => {
    if (!flashButton) return;
    const t = setTimeout(() => setFlashButton(""), 300);
    return () => clearTimeout(t);
  }, [flashButton]);

  return (
    <main className="app">
      <section className="card">
        {/* ===== Header ===== */}
        <header className="card__header">
          <h1 className="brand">LapTrack</h1>
          <p className="subtitle">Simple lap timer for focus &amp; training</p>
        </header>

        {/* ===== Digits ===== */}
        <div className="display">
          <span className="digits">{formatTime(time)}</span>
        </div>

        {/* ===== Controls ===== */}
        <div className="controls" role="group">
          <button
            className={`btn btn--ghost ${
              flashButton === "pause" ? "btn--flash" : ""
            }`}
            onClick={stopTimer}
            disabled={!isRunning}
          >
            Pause
          </button>

          <button
            className={`btn btn--primary ${
              flashButton === "start" ? "btn--flash" : ""
            }`}
            onClick={startTimer}
            disabled={isRunning}
          >
            {time > 0 ? "Resume" : "Start"}
          </button>

          <button
            className={`btn btn--danger ${
              flashButton === "reset" ? "btn--flash" : ""
            }`}
            onClick={resetTimer}
            disabled={time === 0}
          >
            Reset
          </button>

          <button
            className={`btn btn--accent ${
              flashButton === "lap" ? "btn--flash" : ""
            }`}
            onClick={splitTimer}
            disabled={!isRunning}
          >
            Add Lap
          </button>
        </div>

        {/* ===== Shortcuts hint ===== */}
        <p className="shortcuts-hint">
          Shortcuts:{" "}
          <span>
            <b>Space</b> = Start/Pause
          </span>
          <span>
            <b>R</b> = Reset
          </span>
          <span>
            <b>L</b> = Add Lap
          </span>
        </p>

        {/* ===== Laps ===== */}
        {laps.length === 0 ? (
          <div className="laps">
            <div className="laps__head">
              <h2>Laps</h2>
              <small>
                No laps yet — press <b>Add Lap</b> while running
              </small>
            </div>
          </div>
        ) : (
          <div className="laps">
            <div className="laps__head">
              <h2>Session Laps</h2>
              <small>{laps.length} records</small>
            </div>
            <ol className="laplist">
              {laps.map((lap, idx) => {
                const prev = idx === 0 ? 0 : laps[idx - 1];
                const diff = lap - prev;
                return (
                  <li className="lap" key={idx}>
                    <span className="lap__no">Lap {idx + 1}</span>
                    <span className="lap__time">{formatTime(lap)}</span>
                    <span className="lap__diff">Δ {formatTime(diff)}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {/* ===== Footer ===== */}
        <footer className="footer">
          <span>
            v1.2 · Simple lap timer for focus &amp; training · Open source
          </span>
        </footer>
      </section>
    </main>
  );
}

export default App;
