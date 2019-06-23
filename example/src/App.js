import React, { useState } from 'react';
import ReactLiveTime from 'react-live-time';

export default function App() {
  const [date, setDate] = useState(Date.now());
  const [format, setFormat] = useState('isoDateTime');
  const [showSeconds, setShowSeconds] = useState(false);

  const removeMinute = () => {
    const __d = new Date(date);
    setDate(__d.setMinutes(__d.getMinutes() - 1));
  };

  const removeHour = () => {
    const __d = new Date(date);
    setDate(__d.setHours(__d.getHours() - 1));
  };

  const resetDate = () => {
    setDate(Date.now());
  };

  const changeFormat = e => {
    setFormat(e.target.value);
  };

  const changeShowSeconds = e => {
    setShowSeconds(e.target.checked);
  };

  return (
    <div>
      <p>DATE: {new Date(date).toLocaleString()}</p>
      <p>
        <ReactLiveTime
          time={date}
          format={format}
          showSeconds={showSeconds}
          renderer={({ text, status, diff }) => (
            <span>
              {text}, {status}, {diff}
            </span>
          )}
        />
      </p>
      <p>
        Remove hours or minutes:
        <button onClick={removeMinute}>Minute</button>
        <button onClick={removeHour}>Hour</button>
        <button onClick={resetDate}>Reset Date</button>
        <input
          type="text"
          onChange={changeFormat}
          value={format}
          placeholder="Add format"
        />
        <label htmlFor="showSeconds">
          <input
            type="checkbox"
            name="showSeconds"
            onChange={changeShowSeconds}
            value={showSeconds}
          />
          Show seconds?
        </label>
      </p>
      <p>
        For formatting values, check out{' '}
        <a
          href="https://github.com/felixge/node-dateformat#mask-options"
          rel="noopener noreferrer"
          target="_blank"
        >
          mask options
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/felixge/node-dateformat#named-formats"
          rel="noopener noreferrer"
          target="_blank"
        >
          named formats
        </a>
        . Formatting powered by{' '}
        <a
          href="https://github.com/felixge/node-dateformat"
          rel="noopener noreferrer"
          target="_blank"
        >
          dateformat
        </a>
        .
      </p>
    </div>
  );
}
