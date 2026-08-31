# Spark Collab

A full-stack collaborative web application for creating and managing interactive boards with secure authentication and a modern React interface.

## 🚀 Live Demo

- **Frontend:** https://spark-collab-client.onrender.com
- **Backend API:** https://spark-collab-server.onrender.com

## 📌 Overview

Spark Collab is a full-stack collaboration application built with React.js, Node.js, Express.js, and PostgreSQL.

The application allows users to securely authenticate, create and manage boards, and work with an interactive board workspace.

The project is containerized using Docker and deployed on Render, with PostgreSQL hosted on Supabase.

## ✨ Features

- User registration and login
- JWT-based authentication
- Secure HttpOnly authentication cookies
- Protected API routes
- Create, read, update, and delete boards
- Board ownership and authorization
- Interactive board workspace
- Responsive user interface
- RESTful backend API
- PostgreSQL database
- Dockerized frontend and backend
- Nginx for production frontend serving
- Docker Compose for local development
- Production deployment using Render
- Supabase PostgreSQL integration
- Environment-based configuration

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Ant Design
- Tailwind CSS
- Axios
- React Router
- Konva

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- cookie-parser
- CORS

### Database

- PostgreSQL
- Supabase

### DevOps & Deployment

- Docker
- Docker Compose
- Nginx
- Render
- Git
- GitHub

## 🏗️ Architecture

    ┌──────────────────────────┐
    │      React Client        │
    │                          │
    │ React + Vite             │
    │ Ant Design               │
    │ Tailwind CSS + Sass      │
    └────────────┬─────────────┘
                 │
                 │ HTTPS / REST API
                 ▼
    ┌──────────────────────────┐
    │      Express Server      │
    │        Node.js           │
    │                          │
    │ Authentication           │
    │ Middleware               │
    │ Controllers              │
    │ Services                 │
    │ Models                   │
    └────────────┬─────────────┘
                 │
                 │ PostgreSQL
                 ▼
    ┌──────────────────────────┐
    │        Supabase          │
    │      PostgreSQL DB       │
    └──────────────────────────┘

## 📁 Project Structure

    spark-collab/
    │
    ├── client/
    │   ├── public/
    │   ├── src/
    │   ├── Dockerfile
    │   ├── nginx.conf
    │   ├── package.json
    │   ├── package-lock.json
    │   └── vite.config.js
    │
    ├── server/
    │   ├── config/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── app.js
    │   ├── index.js
    │   ├── Dockerfile
    │   ├── package.json
    │   └── package-lock.json
    │
    └── compose.yaml

## 🔐 Authentication

Spark Collab uses JWT-based authentication with HttpOnly cookies.

### Authentication Flow

1. User submits username and password.
2. The backend validates the credentials.
3. A JWT access token is generated.
4. The token is stored in an HttpOnly cookie.
5. The browser automatically sends the cookie with authenticated requests.
6. Authentication middleware verifies the JWT.
7. The authenticated user's information is attached to the request.
8. Protected resources can then be accessed.

### Production Cookie Configuration

Production authentication cookies use:

- HttpOnly
- Secure
- SameSite=None

This allows secure authentication between the separately deployed frontend and backend services.

## 📡 API Endpoints

### Authentication

    POST   /api/auth/register
    POST   /api/auth/login
    POST   /api/auth/logout
    GET    /api/auth/me

### Boards

    POST   /api/boards
    GET    /api/boards
    GET    /api/boards/:id
    PUT    /api/boards/:id
    DELETE /api/boards/:id

Board endpoints are protected and require an authenticated user.

## 🐳 Docker

The application uses Docker to containerize both the frontend and backend.

### Backend Docker Container

The backend runs inside a Node.js container.

The Docker image installs the backend dependencies, copies the application source code, and starts the Express server.

### Frontend Docker Container

The frontend uses a multi-stage Docker build.

The first stage uses Node.js to:

1. Install dependencies.
2. Build the React application using Vite.
3. Generate the production `dist` directory.

The second stage uses Nginx to serve the generated static files.

    Node.js
       │
       ├── Install dependencies
       │
       ├── Build React application
       │
       ▼
      dist/
       │
       ▼
    Nginx
       │
       └── Serve production frontend

### Docker Compose

Docker Compose is used to run the frontend and backend services together during local development.

Build and start the application:

    docker compose up --build

Run in detached mode:

    docker compose up --build -d

Stop the containers:

    docker compose down

## ⚙️ Environment Variables

Environment variables are used to keep configuration and sensitive credentials outside the source code.

### Backend Environment Variables

Example local configuration:

    PORT=3000
    DATABASE_URL=your_postgresql_connection_string
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=your_jwt_expiration
    COOKIE_MAX_AGE=your_cookie_max_age
    CLIENT_URL=http://localhost:5173

Production environment variables are configured through Render.

### Frontend Environment Variables

Local development:

    VITE_API_BASE_URL=http://localhost:3000/api

Production:

    VITE_API_BASE_URL=https://spark-collab-server.onrender.com/api

Vite environment variables prefixed with `VITE_` are embedded into the application during the production build.

## 💻 Local Development

### Clone the Repository

    git clone https://github.com/SaishSawant21/spark-collab.git
    cd spark-collab

### Install Frontend Dependencies

    cd client
    npm install

### Install Backend Dependencies

    cd ../server
    npm install

### Configure Environment Variables

Configure the required environment variables for both the frontend and backend.

### Start the Backend

    cd server
    npm run dev

The backend runs on:

    http://localhost:3000

### Start the Frontend

Open another terminal:

    cd client
    npm run dev

The frontend runs on:

    http://localhost:5173

## ☁️ Deployment

The application is deployed using Render.

### Frontend Deployment

The frontend is deployed as a Docker service.

The Docker build process:

1. Pulls the Node.js base image.
2. Installs frontend dependencies.
3. Builds the React application using Vite.
4. Creates an Nginx production image.
5. Copies the generated `dist` directory into Nginx.
6. Copies the custom Nginx configuration.
7. Runs Nginx to serve the frontend.

### Backend Deployment

The backend is deployed as a separate Docker service.

The backend:

1. Runs inside a Node.js Docker container.
2. Exposes the application port provided by Render.
3. Connects to the Supabase PostgreSQL database.
4. Provides the REST API to the frontend.

### Database Deployment

The production database is hosted on Supabase PostgreSQL.

The backend connects to Supabase using a PostgreSQL connection string stored as an environment variable.

## 🔒 Security

- Passwords are hashed using bcrypt.
- Authentication is handled using JWT.
- JWT tokens are stored in HttpOnly cookies.
- Production cookies use Secure and SameSite=None.
- Protected API routes require authentication.
- CORS is configured to allow requests from the deployed frontend.
- Database credentials are stored in environment variables.
- JWT secrets are stored in environment variables.
- Sensitive environment files are not committed to the repository.

## 🧪 Production Stack

    Frontend
    React + Vite
          ↓
        Docker
          ↓
        Nginx
          ↓
        Render

    Backend
    Node.js + Express
          ↓
        Docker
          ↓
        Render
          ↓
    Supabase PostgreSQL

## 🔮 Future Improvements

- Real-time collaboration using WebSockets
- Multiple users editing the same board simultaneously
- Board sharing and invitations
- Role-based board permissions
- Additional canvas elements
- Image and file uploads
- Activity history
- Notifications
- Dark mode
- Automated testing
- CI/CD pipeline

## 👨‍💻 Author

**Saish Sawant**

GitHub: https://github.com/SaishSawant21

Portfolio: https://portfolio-app-mocha-beta.vercel.app/

## 📄 License

This project is intended for educational and portfolio purposes.