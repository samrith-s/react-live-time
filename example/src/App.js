import React from 'react';
import ReactLiveTime from 'react-live-time';

export default function App() {
  return (
    <div>
      <ReactLiveTime time={new Date()} />
    </div>
  );
}
