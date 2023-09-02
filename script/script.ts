import axios from "axios";

const serverUrl = "http://localhost:5000/session";
const pingInterval = 5000; 

function start() {
  const requestData = {
    date: new Date(), 
  };

  axios
    .post(`${serverUrl}/initialise`, requestData)
    .then(() => {
      console.log("POST request successful");
    })
    .catch((error) => {
      console.error("Error making POST request:", error);
    });
}

function sendPing() {
    const requestData = {
        date: new Date(), 
    };
    
    axios
    .post(`${serverUrl}/ping`, requestData)
    .then(() => {
      console.log("POST request successful");
    })
    .catch((error) => {
      console.error("Error making POST request:", error);
    });
}

start();
setInterval(sendPing, pingInterval);
