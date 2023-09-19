<div align="center">
  <h1>Runtime Tracker</h1>
   <img src="https://github.com/thomasbrnf/runtime-tracker/assets/57502071/4d3d1d22-3865-40b7-a8fc-f53d294dbd1c" alt="logo">
</div> 

<div> 
  <img src="https://github.com/thomasbrnf/runtime-tracker/assets/57502071/6a7f2c65-650a-4bd5-a44d-dee867fe15d6" alt="landing-page">
  <img src="https://github.com/thomasbrnf/runtime-tracker/assets/57502071/d2ebb26f-717a-448a-b151-0306c3d2c79f" alt="create-device">
  <img src="https://github.com/thomasbrnf/runtime-tracker/assets/57502071/697725fc-f71f-495f-802d-bed6723dce5a" alt="in-action">
  <img src="https://github.com/thomasbrnf/runtime-tracker/assets/57502071/8930044b-99ec-4689-821d-7feec7624e46" alt="google-calendar">
  <img src="https://github.com/thomasbrnf/runtime-tracker/assets/57502071/6d2f6894-8c6d-48f1-aeee-7da5e181c0e6" alt="devices-page">
  <img src="https://github.com/thomasbrnf/runtime-tracker/assets/57502071/a43dcab3-0de8-42db-b69e-b06e2538ee48" alt="sessions-page">
  <img src="https://github.com/thomasbrnf/runtime-tracker/assets/57502071/5edf78b2-ec5e-4f98-905b-0080b872f8e8" alt="device-page-mobile">
</div>

## Quick start guide

Clone this repository to your local machine, after that, go to server folder and create ```.env``` file with this properties:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_HOST=postgresql
POSTGRES_PORT=5432

GOOGLE_CLIENT_ID={insert-your-client-id-here}
GOOGLE_CLIENT_SECRET={insert-your-sercret-here}
```
Google credentials you can generate on your google cloud in api&services section. For that you have to register your application, with this scopes: ```['email', 'profile', 'https://www.googleapis.com/auth/calendar']```, and set the callbackURL to ```http://localhost:3000/auth/google-redirect```.

Now, go back to the root folder, start CLI and execute this command to run docker-compose: ```docker-compose up --build```

You are good to go, navigate yourself to the ```http://localhost:5173/``` and test this application. 
