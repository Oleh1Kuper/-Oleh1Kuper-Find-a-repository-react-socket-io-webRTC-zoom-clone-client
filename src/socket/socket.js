import io from 'socket.io-client';
import store from '../store/store';
import { actions } from '../features/room';
import { handleSignalData, prepareNewPeerConnection, removePeerConnection } from '../utils/webRTCHandler';
import { appendMessageToHistory } from '../utils/directMessages';

const socket = io('https://react-socket-io-webrtc-zoom-clone-server.onrender.com');
const { dispatch } = store;

export const connetWithSocket = () => {
  socket.on('connect', () => {
    console.log('client is connected', socket.id);
    dispatch(actions.setSocketId(socket.id));
  });

  socket.on('room-id', (data) => {
    console.log('room id', data);
    dispatch(actions.setRoomId(data.roomId));
  });

  socket.on('room-update', (data) => {
    console.log('room-update', data);
    dispatch(actions.setParticipants(data.connectedUsers));
  });

  socket.on('connection-prepare', (data) => {
    console.log('connection-prepare', data);
    const { connectedUserSocketId } = data;
    prepareNewPeerConnection(connectedUserSocketId, false);

    socket.emit('connection-init', { connectedUserSocketId });
  });

  socket.on('connection-signal', (data) => {
    console.log('connection-signal', data);
    handleSignalData(data);
  });

  socket.on('connection-init', (data) => {
    console.log('connection-init', data);
    prepareNewPeerConnection(data.connectedUserSocketId, true);
  });

  socket.on('user-disconnected', (data) => {
    console.log('user-disconnected', data);
    removePeerConnection(data);
  });

  socket.on('direct-message', (data) => {
    console.log('direct-message', data);
    appendMessageToHistory(data);
  });
};

export const createNewRoom = (username, onlyAudio) => {
  socket.emit('create-new-room', { username, onlyAudio });
};

export const joinRoom = (roomId, username, onlyAudio) => {
  socket.emit('join-room', { roomId, username, onlyAudio });
};

export const signalPeerData = (data) => {
  socket.emit('connection-signal', data);
};

export const sendDirectMessage = (data) => {
  socket.emit('direct-message', data);
};
