import React, { FunctionComponent, useState, useEffect } from 'react';

interface ReactLiveTimeProps {
  time: number;
}

const ReactLiveTime: FunctionComponent<ReactLiveTimeProps> = ({
  time: propTime = 0
}) => {
  const [time, updateTime] = useState(propTime);

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   updateTime(time + 1);
    // });
    // return () => clearTimeout(timer);
  }, [time, updateTime]);

  return <div>Example Component: {time}</div>;
};

export default ReactLiveTime;
