import { getTURNCredentials } from './api';

let TURNIceServers = null;

// eslint-disable-next-line consistent-return
export const fetchTURNCredentials = async () => {
  try {
    const responseData = await getTURNCredentials();

    if (responseData.token?.iceServers) {
      TURNIceServers = responseData.token.iceServers;
    }

    return TURNIceServers;
  } catch (error) {
    console.error(error);
  }
};

export const getTurnIceServers = () => {
  return TURNIceServers;
};
