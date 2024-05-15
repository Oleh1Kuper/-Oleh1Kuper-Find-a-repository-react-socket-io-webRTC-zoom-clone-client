import { createBrowserRouter } from 'react-router-dom';
import RoomPage from './pages/RoomPage/RoomPage';
import JoinRoomPage from './pages/JoinRoomPage/JoinRoomPage';
import IntroductionPage from './pages/IntroductionPage/IntroductionPage';

export const router = createBrowserRouter([
  { path: '/', element: <IntroductionPage /> },
  { path: '/room', element: <RoomPage /> },
  { path: '/join-room', element: <JoinRoomPage /> },
]);
