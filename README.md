Installation
Prerequisites

Node.js (v14+)
PostgreSQL
npm or yarn

Environment Setup

Backend Setup:
1. `cd server`
2. `npm install`

Create a .env file in the server directory with:

`PORT=5000`
`DB_NAME=messaging_app`
`DB_USER=postgres`
`DB_PASSWORD=your_password`
`DB_HOST=localhost`
`JWT_SECRET=your_jwt_secret`
`NODE_ENV=development`
`CLIENT_URL=http://localhost:3000`


Frontend Setup:
1. `cd client`
2. `npm install --legacy-peer-deps`

Create a .env file in the client directory with:

`REACT_APP_API_URL=http://localhost:5000/api`
`REACT_APP_SOCKET_URL=http://localhost:5000`


Running the Application

Start the backend server:
1. `cd server`
2. `npm run dev`

Start the frontend development server:
1. `cd client`
2. `npm start`

API Documentation
Authentication Endpoints

Register a new user

POST /api/auth/register
Request body: { "username": "user1", "password": "password123" }
Response: { "id": "uuid", "username": "user1", "token": "jwt_token" }


Login

POST /api/auth/login
Request body: { "username": "user1", "password": "password123" }
Response: { "id": "uuid", "username": "user1", "token": "jwt_token" }


Get current user

GET /api/auth/me
Headers: Authorization: Bearer jwt_token
Response: { "id": "uuid", "username": "user1", "lastActive": "date" }


Get all users

GET /api/auth/users
Headers: Authorization: Bearer jwt_token
Response: Array of { "id": "uuid", "username": "user1", "lastActive": "date" }



Message Endpoints

Get messages with a specific user

GET /api/messages/:userId
Headers: Authorization: Bearer jwt_token
Response: Array of message objects


Send a message

POST /api/messages
Headers: Authorization: Bearer jwt_token
Request body: { "receiverId": "user_id", "content": "Hello there!" }
Response: Created message object



Testing

Run backend tests:
1. `cd server`
2. `npm test --findRelatedTests test/auth.test.js`
3. `npm test --findRelatedTests test/message.test.js`
