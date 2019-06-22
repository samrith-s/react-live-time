import React, { FunctionComponent, useState, useEffect } from 'react';

interface ReactLiveTimeProps {
  time: number;
}

const ReactLiveTime: FunctionComponent<ReactLiveTimeProps> = ({
  time: propTime
}) => {
  const timeValue = new Date(propTime);

  if (timeValue.toString() === 'Invalid Date') {
    throw new Error(
      `[React Live Date]: Unexpected date value for prop 'time'.`
    );
  }

  const [time, updateTime] = useState(timeValue);

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   updateTime(time + 1);
    // });
    // return () => clearTimeout(timer);
  }, [time, updateTime]);

  return <div>Example Component: {time}</div>;
};

export default ReactLiveTime;
