import React, { FunctionComponent, useState, useEffect } from 'react';

import {
  FORMAT,
  getStatusFromTime,
  getTimeoutFromStatus,
  setDiff,
  getTextFromTimeAndStatus
} from './util';

interface ReactLiveTimeProps {
  time: Date;
  format?: string;
}

const ReactLiveTime: FunctionComponent<ReactLiveTimeProps> = ({
  time,
  format = FORMAT
}) => {
  let timeValue: number;

  try {
    timeValue = new Date(time).getTime();
  } catch (e) {
    throw new Error(e);
  }

  const diffSetter = setDiff(timeValue);
  let diff = diffSetter();

  const textSetter = getTextFromTimeAndStatus(diff, timeValue, format);

  const [status, setStatus] = useState(getStatusFromTime(diff));
  const [text, setText] = useState(textSetter(status));

  useEffect(() => {
    const timeout: number = getTimeoutFromStatus(status);
    const timer = setTimeout(() => {
      diff = diffSetter();
      setStatus(getStatusFromTime(diff));
      setText(textSetter(status));
    }, timeout);
    return () => clearTimeout(timer);
  }, [status]);

  return <div>Example Component: {text}</div>;
};

export default ReactLiveTime;
