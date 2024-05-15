import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import ButtonsContainer from '../ButtonsContainer/ButtonsContainer';
import { getRoomExists } from '../../utils/api';
import { actions } from '../../features/room';

function JoinRoomContent() {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const { isRoomHost } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeRoomId = (e) => {
    setRoomId(e.target.value);
  };

  const handleJoin = async () => {
    dispatch(actions.setUserName(userName));

    if (isRoomHost) {
      createRoom();
    } else {
      await joinRoom();
    }
  };

  const joinRoom = async () => {
    try {
      const response = await getRoomExists(roomId);
      const { isRoomExists, full } = response;

      if (isRoomExists) {
        if (full) {
          setError('Meeting is full, try later');
        } else {
          dispatch(actions.setRoomId(roomId));
          navigate('/room');
        }
      } else {
        setError('Meeting is not found');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createRoom = () => {
    navigate('/room');
  };

  return (
    <>
      <div className="join_room_inputs_container">
        {!isRoomHost && (
          <Input
            placeholder="Enter metting id"
            value={roomId}
            handleChange={handleChangeRoomId}
          />
        )}

        <Input
          placeholder="Enter your name"
          handleChange={handleChangeName}
          value={userName}
        />

      </div>

      <div className="error_message_container">
        <p className="error_message_paragraph">{error}</p>
      </div>

      <ButtonsContainer handleJoin={handleJoin} />
    </>
  );
}

export default JoinRoomContent;
