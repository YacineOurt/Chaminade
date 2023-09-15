import { io } from 'socket.io-client';

export const socket_io = io(process.env.EXPO_PUBLIC_BACKEND_URL);

