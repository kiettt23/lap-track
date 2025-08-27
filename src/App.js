import useTimer from "./useTimer";
import { formatTime } from "./formatTime";

function App() {
  // Hook API
  const { time, laps, startTimer, stopTimer, resetTimer, splitTimer, active } =
    useTimer(0);

  return (
    <main className="app">
      <section className="card">
        {/* === Brand === */}
        <header className="card__header">
          <h1 className="brand">LapTrack</h1>
          <p className="subtitle">Simple lap timer for focus &amp; training</p>
        </header>

        {/* === Digits === */}
        <div className="display">
          <span className="digits">{formatTime(time)}</span>
        </div>

        {/* === Controls === */}
        <div className="controls" role="group">
          <button className="btn btn--ghost" onClick={stopTimer}>
            Pause
          </button>
          <button
            className="btn btn--primary"
            ref={active}
            onClick={startTimer}
          >
            Start
          </button>
          <button className="btn btn--danger" onClick={resetTimer}>
            Reset
          </button>
          <button
            className="btn btn--accent"
            onClick={splitTimer}
            disabled={!time}
          >
            Add Lap
          </button>
        </div>

        {/* === Laps === */}
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
            <ol className="laplist" aria-label="Lap list">
              {laps.map((lap, idx) => {
                const prev = idx === 0 ? 0 : laps[idx - 1];
                const diff = lap - prev; // chênh lệch so với mốc trước
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

        {/* === Footer === */}
        <footer className="footer">
          <span>
            v1.0 · Simple lap timer for focus &amp; training · Open source
          </span>
        </footer>
      </section>
    </main>
  );
}

export default App;
