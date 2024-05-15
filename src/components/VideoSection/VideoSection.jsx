import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoButtons from '../VideoButtons/VideoButtons';

function StreamVideo({ stream }) {
  const videoRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div className="video_track_container">
      <video
        onClick={toggleFullScreen}
        className={isFullScreen ? 'full_screen' : ''}
        ref={videoRef}
        autoPlay
        width="100%"
        height="100%"
      >
        <track kind="captions" srcLang="en" label="English" />
      </video>
    </div>
  );
}

function VideoSection() {
  const { streams, localStream } = useSelector((state) => state.room);

  return (
    <div className="video_section_container">
      <div className="videos_portal_styles">
        {localStream && (
          <StreamVideo stream={localStream} />
        )}

        {streams.map(({ stream, connectedUserSocketId }) => (
          <StreamVideo stream={stream} key={connectedUserSocketId} />
        ))}
      </div>
      <VideoButtons />
    </div>
  );
}

export default VideoSection;
