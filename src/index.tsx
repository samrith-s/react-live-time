import React, { FunctionComponent, useState, useEffect } from 'react';

interface ReactLiveTimeProps {
  time: number;
}

const ReactLiveTime: FunctionComponent<ReactLiveTimeProps> = ({
  time: propTime
}) => {
  let timeValue;

  try {
    timeValue = new Date(propTime);
  } catch (e) {
    throw new Error(e);
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
