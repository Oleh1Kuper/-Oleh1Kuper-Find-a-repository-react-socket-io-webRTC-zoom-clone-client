import React, { useState } from 'react';
import { BiSolidMicrophone, BiSolidMicrophoneOff } from 'react-icons/bi';
import { FaVideo, FaVideoSlash } from 'react-icons/fa6';
import { MdOutlineScreenShare, MdOutlineStopScreenShare } from 'react-icons/md';

import { useSelector } from 'react-redux';
import VideoButton from '../VideoButton/VideoButton';
import LocalScreen from '../LocalScreen/LocalScreen';
import { toggleScreenShare } from '../../utils/webRTCHandler';

function VideoButtons() {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const { localStream, isConnectWithAudio } = useSelector(
    (state) => state.room,
  );

  const handleMute = () => {
    setIsMuted((prev) => !prev);
    localStream.getAudioTracks()[0].enabled = isMuted;
  };

  const handleCamera = () => {
    setIsCameraOn((prev) => !prev);
    localStream.getVideoTracks()[0].enabled = isCameraOn;
  };

  const handleShare = async () => {
    if (!screenSharingStream) {
      let stream = null;

      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          audio: false,
          video: true,
        });
      } catch (error) {
        console.error(error);
      }

      if (stream) {
        setScreenSharingStream(stream);
        setIsShared(true);
        toggleScreenShare(isShared, stream);
      }
    } else {
      toggleScreenShare(isShared);
      setIsShared(false);
      screenSharingStream.getTracks().forEach((track) => {
        track.stop();
      });
      setScreenSharingStream(null);
    }
  };

  const leaveRoom = () => {
    // navigate('/');
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <div className="video_buttons_container">
      <VideoButton handleClick={handleMute}>
        {isMuted ? (
          <BiSolidMicrophoneOff className="video_button_image" />
        ) : (
          <BiSolidMicrophone className="video_button_image" />
        )}
      </VideoButton>

      {!isConnectWithAudio && (
        <VideoButton handleClick={handleCamera}>
          {isCameraOn ? (
            <FaVideoSlash className="video_button_image" />
          ) : (
            <FaVideo className="video_button_image" />
          )}
        </VideoButton>
      )}

      {!isConnectWithAudio && (
        <div>
          <VideoButton handleClick={handleShare}>
            {isShared ? (
              <MdOutlineStopScreenShare className="video_button_image" />
            ) : (
              <MdOutlineScreenShare className="video_button_image" />
            )}
          </VideoButton>

          {isShared && <LocalScreen stream={screenSharingStream} />}
        </div>
      )}

      <VideoButton>
        <button className="video_button_end" onClick={leaveRoom} type="button">
          Leave Room
        </button>
      </VideoButton>
    </div>
  );
}

export default VideoButtons;
