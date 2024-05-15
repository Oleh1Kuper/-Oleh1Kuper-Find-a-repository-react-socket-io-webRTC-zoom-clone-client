import axios from 'axios';

const serverApi = 'https://react-socket-io-webrtc-zoom-clone-server.onrender.com/api';

export const getRoomExists = async (roomId) => {
  try {
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTURNCredentials = async () => {
  try {
    const response = await axios.get(`${serverApi}/get-turn-credentials`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
