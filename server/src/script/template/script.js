const axios = require('axios/dist/node/axios.cjs');

const serverUrl = 'http://localhost:3000/users';
const pingInterval = 5000;
const deviceId = 5;
const userId = 5;
let interval;

async function start() {
  const response = await axios.get(
    `${serverUrl}/${userId}/${deviceId}/session/initialise`,
  );
  if (!response.data) return;
  const sessionId = response.data;

  interval = setInterval(() => {
    sendPing(sessionId);
  }, pingInterval);
}

async function sendPing(sessionId) {
  const response = await axios.get(
    `${serverUrl}/${userId}/${deviceId}/session/${sessionId}/ping`,
  );

  if (!response.data) {
    clearInterval(interval);
    start();
  }
  console.log(response.data);
}

start();
