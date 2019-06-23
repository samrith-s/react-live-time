import React, { FunctionComponent, useState, useEffect } from 'react';

import {
  FORMAT,
  getStatusFromTime,
  getTimeoutFromStatus,
  textSetter,
  diffSetter
} from './util';

interface ReactLiveTimeProps {
  time: Date | number;
  format?: string;
  renderer?: Function;
  showSeconds?: boolean;
}

const ReactLiveTime: FunctionComponent<ReactLiveTimeProps> = ({
  time,
  format = FORMAT,
  showSeconds = false,
  renderer
}) => {
  const [diff, setDiff] = useState(diffSetter(time));
  const [status, setStatus] = useState(getStatusFromTime(diff));
  const [text, setText] = useState(textSetter(diff, time, status, format));

  useEffect(() => setDiff(diffSetter(time)), [time, showSeconds]);
  useEffect(() => setStatus(getStatusFromTime(diff, showSeconds)), [
    diff,
    showSeconds
  ]);
  useEffect(() => {
    setText(textSetter(diff, time, status, format));
  }, [status, diff, format]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDiff(diffSetter(time));
    }, getTimeoutFromStatus(status));
    return () => clearTimeout(timer);
  }, [diff]);

  return renderer ? (
    renderer({ time, status, diff, format, text })
  ) : (
    <span>Example Component: {text}</span>
  );
};

export default ReactLiveTime;
