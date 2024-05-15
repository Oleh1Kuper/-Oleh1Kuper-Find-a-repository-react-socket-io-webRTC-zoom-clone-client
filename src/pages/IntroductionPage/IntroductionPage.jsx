import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import logo from '../../assets/logo.png';
import ConnectButton from '../../components/ConnectButton/ConnectButton';
import { actions } from '../../features/room';
import * as socketConnection from '../../socket/socket';

import './IntroductionPage.css';

function IntroductionPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setIsRoomHost(false));
    socketConnection.connetWithSocket();
  }, []);

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img src={logo} alt="logo" className="introduction_page_image" />

        <div className="connecting_buttons_container">
          <ConnectButton isJoinBtn>Join a meeting</ConnectButton>
          <ConnectButton>Host a meeting</ConnectButton>
        </div>
      </div>
    </div>
  );
}

export default IntroductionPage;
