import React from 'react';
import useMedia from './useMedia';

const ScreenRecording = () => {
  const { status, startRecording } = useMedia();

  const handleStop = () => {
    console.log('Stop recording');
  };

  const handleStart = () => {
    startRecording();
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '300px' }}>
      <div
        style={{
          width: '200px',
          height: '200px',
          border: '2px solid #ccc',
          padding: '15px',
        }}
      >
        {status}
      </div>

      <div
        style={{
          padding: '10px 20px',
        }}
      >
        <button onClick={handleStart}>Record</button>
        <button onClick={handleStop}>Stop</button>
        <button>Pause</button>
      </div>
    </div>
  );
};

export default ScreenRecording;
