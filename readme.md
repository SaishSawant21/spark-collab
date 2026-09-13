# Spark Collab

A full-stack real-time collaborative whiteboard application that allows users to create, manage, share, and collaborate on boards with role-based access control.

## 🚀 Live Demo

* **Frontend:** https://spark-collab-client.onrender.com
* **Backend:** https://spark-collab-server.onrender.com

## 📌 Features

### 🔐 Authentication & Security

* User registration and login
* JWT-based authentication using **HttpOnly cookies**
* Secure password hashing using **bcrypt**
* Protected routes
* Automatic authentication state handling
* Logout functionality
* Forgot password functionality
* Secure password reset using time-limited tokens
* Password reset tokens are hashed before being stored in the database
* Password reset links expire after 30 minutes

### 📋 Board Management

* Create new boards
* View all boards
* Open and edit boards
* Rename boards
* Delete boards
* Board ownership management

### 👥 Real-Time Collaboration

* Real-time collaboration using WebSockets
* Multiple users can work on the same board
* Live synchronization of board changes
* Real-time updates between connected users

### 🔗 Board Sharing

* Share boards with other users
* Add members to boards
* Manage board members
* Role-based access control

### 🛡️ Role-Based Permissions

Boards support three roles:

| Role       | Permissions                                                          |
| ---------- | -------------------------------------------------------------------- |
| **Owner**  | Full board access, member management, undo/redo, zoom, reset, delete |
| **Editor** | Edit board, undo/redo, zoom, reset                                   |
| **Viewer** | View board, zoom, reset                                              |

Permissions are enforced on the backend to prevent unauthorized operations.

### 🎨 Whiteboard

* Interactive canvas powered by **React Konva**
* Drawing and canvas interactions
* Select and manipulate elements
* Zoom controls
* Canvas reset
* Undo / Redo
* Delete selected elements
* Board-specific canvas state
* Real-time synchronization

### 👤 User Profile

* View user information
* Update profile information

### 📧 Email

* Password reset emails using **MailerSend**
* HTML and plain-text email support
* Secure password reset links

### ⚡ Performance

* Lazy-loaded application pages
* Route-based code splitting
* Loading states using Ant Design
* Optimized frontend bundle loading

### 📱 Responsive UI

* Responsive layout
* Built with **Tailwind CSS**
* UI components powered by **Ant Design**
* Light theme with emerald accents

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Ant Design
* Tailwind CSS
* Sass
* Axios
* React Konva
* Konva
* Day.js

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT
* bcrypt
* cookie-parser
* CORS
* WebSockets
* MailerSend

### Database

* PostgreSQL
* Supabase PostgreSQL

### Deployment

* Docker
* Nginx
* Render

---

## 📂 Project Structure

```text
spark-collab/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── ...
│   │
│   ├── Dockerfile
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── Dockerfile
│   └── ...
│
├── compose.yaml
└── README.md
```

---

## 🔑 Environment Variables

### Frontend

Create an environment file inside the client directory:

```env
VITE_API_URL=http://localhost:3000
```

For production:

```env
VITE_API_URL=https://spark-collab-server.onrender.com
```

### Backend

Create an `env.local` file inside the server directory:

```env
PORT=3000

DATABASE_URL=your_database_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

MAIL_SEND_TOKEN=your_mailersend_token
```

For production:

```env
CLIENT_URL=https://spark-collab-client.onrender.com
```

> Never commit environment files containing secrets to Git.

---

## 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/SaishSawant21/spark-collab.git
cd spark-collab
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Configure environment variables

Create the required environment files and add the necessary values.

### 5. Start the backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### 6. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🐳 Running with Docker Compose

The project includes a `compose.yaml` file for running the application using Docker Compose.

Build and start the containers:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

Stop the containers:

```bash
docker compose down
```

---

## 🗄️ Database

Spark Collab uses PostgreSQL as its primary database.

Supabase PostgreSQL is used for the deployed application.

The database stores information such as:

* Users
* Boards
* Board members
* Board roles
* Password reset tokens
* Password reset token expiration times

Password reset tokens are stored as SHA-256 hashes rather than plain-text tokens.

---

## 🔐 Authentication Flow

### Registration

```text
User
 ↓
Registration Form
 ↓
Backend API
 ↓
Password hashed with bcrypt
 ↓
User stored in PostgreSQL
```

### Login

```text
User
 ↓
Login Form
 ↓
Backend API
 ↓
Credentials verified
 ↓
JWT generated
 ↓
JWT stored in HttpOnly cookie
```

### Protected Requests

```text
Browser
 ↓
HttpOnly Cookie
 ↓
Express Middleware
 ↓
JWT Verification
 ↓
Authenticated Request
```

### Password Reset

```text
User
 ↓
Forgot Password
 ↓
Reset token generated
 ↓
Token hashed with SHA-256
 ↓
Hash + expiry stored in PostgreSQL
 ↓
Reset email sent using MailerSend
 ↓
User opens reset link
 ↓
Token validated
 ↓
New password hashed with bcrypt
 ↓
Password updated
 ↓
Reset token removed
```

---

## 🔌 API Overview

### Authentication

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| POST   | `/api/auth/register`        | Register a new user    |
| POST   | `/api/auth/login`           | Login                  |
| POST   | `/api/auth/logout`          | Logout                 |
| GET    | `/api/auth/me`              | Get authenticated user |
| POST   | `/api/auth/forgot-password` | Request password reset |
| POST   | `/api/auth/reset-password`  | Reset password         |

### Boards

Board APIs support operations such as:

* Create board
* List boards
* Get board
* Update board
* Delete board
* Manage board members
* Manage board permissions

All board operations are protected by authentication and authorization middleware.

---

## 🌐 WebSocket Collaboration

Spark Collab uses WebSockets for real-time board collaboration.

The WebSocket layer allows connected users to receive board changes without refreshing the page.

The collaboration flow is approximately:

```text
User A
   ↓
Canvas Change
   ↓
WebSocket Server
   ↓
Connected Users
   ↓
User B / User C
```

Board access permissions are checked so users can only perform operations allowed by their assigned role.

---

## 🔒 Security

The application implements several security practices:

* Password hashing with bcrypt
* JWT authentication
* HttpOnly authentication cookies
* Secure cookies in production
* CORS configuration
* Backend authorization checks
* Role-based permissions
* Hashed password reset tokens
* Expiring password reset tokens
* Environment variables for secrets
* No sensitive credentials committed to Git

---

## 📦 Important Dependencies

### Frontend

```text
react
react-router-dom
antd
axios
tailwindcss
sass
react-konva
konva
dayjs
```

### Backend

```text
express
pg
bcrypt
jsonwebtoken
cookie-parser
cors
ws
mailerSend
dotenv
```

---

## 🚀 Deployment

The application is deployed using Docker containers and Render.

### Frontend

```text
React + Vite
      ↓
Production Build
      ↓
Nginx
      ↓
Docker
      ↓
Render
```

### Backend

```text
Node.js + Express
      ↓
Docker
      ↓
Render
```

### Database

```text
Supabase PostgreSQL
```

---

## 📈 Future Improvements

* More advanced whiteboard elements
* Shapes and drawing tools
* Image and file uploads
* Board activity history
* Notifications
* Invitation emails
* More granular permissions
* Board templates
* Automated testing
* CI/CD pipeline
* Performance monitoring
* Improved conflict handling
* Dark mode
* Additional collaboration features

---

## 🎯 Learning Goals

This project was built to gain practical experience with:

* React application architecture
* REST APIs
* Node.js and Express
* PostgreSQL
* Authentication and authorization
* JWT and HttpOnly cookies
* WebSockets
* Real-time collaboration
* Role-based access control
* Password reset flows
* Email API integration
* Docker
* Nginx
* Cloud deployment
* Frontend performance optimization

---

## 👨‍💻 Author

**Saish Sawant**

* GitHub: https://github.com/SaishSawant21
* Portfolio: https://portfolio-app-mocha-beta.vercel.app/

---

## 📄 License

This project is created for learning and portfolio purposes.
