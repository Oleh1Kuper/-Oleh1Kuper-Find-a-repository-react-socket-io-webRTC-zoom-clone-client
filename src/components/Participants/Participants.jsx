import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../features/room';

function Participants() {
  const { participants, socketId } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  const openChatBox = (user) => () => {
    if (user.socketId !== socketId) {
      dispatch(actions.setActiveConversation(user));
    }
  };

  return (
    <div className="participants_container">
      {participants.map((user, i) => (
        <Fragment key={user.id}>
          <p
            className="participants_paragraph"
            onClick={openChatBox(user)}
            aria-hidden
          >
            {user.username}
          </p>
          {i === participants.length - 1 || (
            <span className="participants_separator_line" />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default Participants;
