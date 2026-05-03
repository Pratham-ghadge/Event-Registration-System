# EventHub - Event Registration System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing and registering for events.

## Features

- **User Authentication**: Secure signup and login using JSON Web Tokens (JWT).
- **Event Creation**: Authenticated users can create events, uploading cover images via Cloudinary.
- **Event Discovery**: Users can browse all upcoming events on the modern, animated homepage.
- **Event Registration**: Users can register for events they wish to attend.
- **Creator Dashboard**: Event creators can view a list of all users registered for their events.
- **Modern UI**: A responsive, premium interface built with Tailwind CSS, featuring glassmorphism and subtle animations.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, React Hot Toast, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ORM).
- **Storage**: Cloudinary (for image hosting).

## Running Locally

1. Clone the repository.
2. Setup environment variables:
   - In `backend/.env`, provide your MongoDB URI, JWT Secret, and Cloudinary credentials.
   - In `frontend/.env`, set `VITE_API_URL=http://localhost:5000/api`.
3. Install dependencies in both folders (`npm install`). Note: for backend, you may need `npm install --legacy-peer-deps`.
4. Run the backend server: `cd backend && npm run dev`
5. Run the frontend server: `cd frontend && npm run dev`
6. Access the application at `http://localhost:5173`.
