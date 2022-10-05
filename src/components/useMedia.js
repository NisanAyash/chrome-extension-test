import React, { useState, useRef } from 'react';
import { useEffect } from 'react';

const STATUS = {
  PENDING: 'pending',
  READY: 'ready',
  ERROR: 'error',
};

const OPTIONS = {
  mediaSupport: { audio: false, video: true },
  recordScreen: true,
};

const useMedia = ({ recordScreen, mediaSupport } = OPTIONS) => {
  const mediaChunks = useRef([]);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  // const [mediaBlob, setMediaBlob] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('pending'); // pending | ready | idle

  const getMediaStream = async () => {
    if (error) {
      setError(null);
    }

    setStatus(STATUS.PENDING);

    let stream = null;

    try {
      if (recordScreen) {
        stream = await window.navigator.mediaDevices.getDisplayMedia(
          mediaSupport
        );
      } else {
        stream = await window.navigator.mediaDevices.getUserMedia(mediaSupport);
      }

      mediaStream.current = stream;
      setStatus(STATUS.READY);
    } catch (error) {
      setStatus(STATUS.ERROR);
    }
  };

  const clearMediaStream = () => {};

  const startRecording = async () => {
    if (error) {
      setError(null);
    }

    if (!mediaStream.current) {
      await getMediaStream();
    }

    mediaChunks.current = [];

    if (mediaStream.current) {
      const RecordOptions = null;

      mediaRecorder.current = new MediaRecorder(
        mediaStream.current,
        RecordOptions
      );

      mediaRecorder.current.addEventListener('dataavailable', () => {
        console.log('dataavailable event listener');
      });
      mediaRecorder.current.addEventListener('stop', () => {
        console.log('stop event listener');
      });
      mediaRecorder.current.addEventListener('error', () => {
        console.log('error event listener');
      });

      mediaRecorder.current.start();
    }

    console.log(mediaStream);
  };

  useEffect(() => {}, []);

  console.count();
  console.log({
    defaultValues: { OPTIONS, STATUS },
    mediaStream,
    status,
    error,
  });

  return {
    status,
    startRecording,
  };
};

export default useMedia;
