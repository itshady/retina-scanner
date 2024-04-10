## Prereq

- Have npm installed
- Setup tailscale on phone and laptop (It's an app to download)
- Download Expo Go on phone
- Make a copy of .env_example
    - Rename it to .env
    - Change the value of `EXPO_PUBLIC_BACKEND_IP` to your IP from tailscale

## Backend

- cd backend
- pip install -r requirements.txt
- Download ML model from [link](https://drive.google.com/file/d/1zF9JOX6kJF7oMeFrFGc0o5Y4sgkRnCMU/view?usp=sharing) and move the `model.keras` it into backend/ml

## Frontend

- cd frontend
- npx expo start

## Demo HTML

- cd backend
- py -m http.server
- write http://localhost:8000/demo.html into your browser
