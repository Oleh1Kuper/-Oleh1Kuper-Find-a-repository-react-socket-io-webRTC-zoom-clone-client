import React from 'react';
import { useSelector } from 'react-redux';

function RoomLabel() {
  const { roomId } = useSelector((state) => state.room);

  return (
    <div className="room_label">
      <p className="room_label_paragraph">
        ID:
        {' '}
        {roomId}
      </p>
    </div>
  );
}

export default RoomLabel;
