import io from "socket.io-client";

let socket;
const port = "https://app.vinawallet.net/";

socket = io(port, {
  transports: ["websocket", "polling", "flashsocket"],
});

export default socket;
