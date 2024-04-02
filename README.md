## Prereq

- Setup tailscale on phone and laptop
- in frontend/app.json, put your tailscale IP down under extra: backendEndpoint

## Backend

- cd backend
- pip install -r requirements.txt
- Download ML model from [link](https://drive.google.com/file/d/1zF9JOX6kJF7oMeFrFGc0o5Y4sgkRnCMU/view?usp=sharing) and move the `model.keras` it into backend/ml

## Frontend

- cd frontend
- npx expo start
