import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ParticipantsSection from '../../components/ParticipantsSection/ParticipantsSection';
import VideoSection from '../../components/VideoSection/VideoSection';
import ChatSection from '../../components/ChatSection/ChatSection';
import RoomLabel from '../../components/RoomLabel/RoomLabel';
import { getLocalPreviewAndInitConnection } from '../../utils/webRTCHandler';
import Spinner from '../../components/Spinner/Spinner';
import './RoomPage.css';

function RoomPage() {
  const {
    roomId,
    username,
    isRoomHost,
    isLoad,
    isConnectWithAudio,
  } = useSelector((state) => state.room);

  useEffect(() => {
    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
    } else {
      getLocalPreviewAndInitConnection(
        isRoomHost,
        username,
        roomId,
        isConnectWithAudio,
      );
    }
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel />
      {isLoad && <Spinner />}
    </div>
  );
}

export default RoomPage;
