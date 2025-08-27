import { formatTime } from "./formatTime";
import useTimer from "./useTimer";

function App() {
  const { time, laps, startTimer, stopTimer, resetTimer, splitTimer, active } =
    useTimer(0);

  return (
    <div className="App container">
      <h1>Coder Timer</h1>
      <div className="timer__wrapper">
        <div className="timer__display">
          <p>{formatTime(time)}</p>
        </div>

        <div className="button__wrapper">
          <button className="button" onClick={stopTimer}>
            Stop
          </button>
          <button className="button" ref={active} onClick={startTimer}>
            Start
          </button>
          <button className="button" onClick={resetTimer}>
            Reset
          </button>
          <button className="button" onClick={splitTimer} disabled={!time}>
            Split
          </button>
        </div>
      </div>

      {laps.length > 0 && (
        <div className="laps">
          <h2>Laps</h2>
          <ol>
            {laps.map((lap, idx) => {
              const prev = idx === 0 ? 0 : laps[idx - 1];
              const diff = lap - prev;
              return (
                <li key={idx}>
                  <strong>{idx + 1}.</strong> {formatTime(lap)} (+
                  {formatTime(diff)})
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
