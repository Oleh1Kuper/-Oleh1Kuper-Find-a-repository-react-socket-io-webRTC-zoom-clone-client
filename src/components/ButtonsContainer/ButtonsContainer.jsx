import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

function ButtonsContainer({ handleJoin }) {
  const { isRoomHost } = useSelector((state) => state.room);
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="join_room_buttons_container">
      <Button success handleClick={handleJoin}>
        {isRoomHost ? 'Host' : 'Join'}
      </Button>
      <Button handleClick={handleCancel}>Cancel</Button>
    </div>
  );
}

export default ButtonsContainer;
