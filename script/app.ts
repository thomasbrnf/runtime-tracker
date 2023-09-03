import axios from "axios";

function init() {
  const serverUrl = "http://localhost:3000/users";
  const pingInterval = 5000; 
  const userId = 7;
  const deviceId = 1;

  async function start() {
    const response = await axios.get(`${serverUrl}/${userId}/${deviceId}/session/initialise`);
    const sessionId: number = response.data;

    setInterval(() => {
      sendPing(sessionId);
    }, pingInterval);
  }

  async function sendPing(sessionId: number) {
    const response = await axios.get(`${serverUrl}/${userId}/${deviceId}/session/${sessionId}/ping`)
    console.log(response);
  }

  start();

}

init();


process.on('SIGINT', () => {
  process.exit(); 
 });