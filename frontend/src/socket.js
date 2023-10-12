import { io } from "socket.io-client";

const url = "/";

export const socket = io.connect(url);
