# TaskSphere 3D — Full-Stack MERN Productivity SaaS

TaskSphere 3D is a **modern, production-quality Full-Stack Todo & Productivity Workspace** built on the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with Tailwind CSS, Three.js / React Three Fiber 3D visuals, Framer Motion animations, and enterprise-grade JWT authentication with complete user data isolation.

---

## 🌟 Key Features

- **Futuristic 3D & Glassmorphic UI**: Interactive Three.js/WebGL floating shapes, 3D tilt hover physics on cards, particle constellations, and frosted glass design language.
- **Secure Authentication**: User registration, login, logout, password hashing with `bcryptjs`, and JSON Web Tokens (JWT) supported via both Authorization headers and HTTP-only cookies.
- **Strict Data Isolation**: Every database operation verifies `req.user._id` so User A can never query, modify, or delete tasks belonging to User B.
- **Productivity Analytics & Statistics**: Dynamic real-time statistics (Total tasks, Completed, Pending, High Priority, Category distribution) and animated circular completion gauges.
- **Complete Todo Management**: Create, view, update, toggle completion with celebratory confetti, and delete with confirmation dialogs.
- **Multi-Dimensional Search & Filtering**: Real-time keyword search, status tabs (*All, In Progress, Completed*), priority filtering (*High, Medium, Low*), category filtering (*Personal, Work, Study, Fitness, Shopping, Other*), and sorting (*Newest, Oldest, Due Date, Title*).
- **Customizable User Profile**: Avatar preset selector or custom image URL, bio update, full name, username change validation, and secure password updater.
- **Dark & Light Mode**: Seamless theme switching persisted in `localStorage`.
- **Responsive Layout**: Collapsible sidebar, top navigation, drawer on mobile/tablet devices, and grid layout.
- **Toast Notifications & Error Handling**: Real-time visual feedback for every user action and centralized error handling.

---

## 🛠️ Tech Stack

### Frontend
- **React.js 18** (Vite bundler)
- **Tailwind CSS** (Custom glassmorphism, glowing borders, and neon palettes)
- **Three.js** & **@react-three/fiber** / **@react-three/drei** (Interactive 3D scenes & particles)
- **Framer Motion** (Page transitions, modal popups, card layouts, and gestures)
- **Axios** (Configured with request/response interceptors and token injection)
- **React Router DOM v6** (Protected and public route management)
- **Lucide React** (Clean icons)
- **Canvas Confetti** (Task completion celebrations)

### Backend
- **Node.js** & **Express.js** (REST API)
- **MongoDB** & **Mongoose** (Document database with indexes)
- **JWT (jsonwebtoken)** (Stateless authorization)
- **bcryptjs** (Salted password hashing)
- **cookie-parser** & **cors** (CORS and cookie security)
- **dotenv** & **morgan** (Configuration and HTTP request logging)

---

## 📁 Project Structure

```text
To Do list/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/              # Icons and static resources
│   │   ├── components/
│   │   │   ├── 3d/              # React Three Fiber interactive canvases
│   │   │   │   ├── FloatingScene3D.jsx
│   │   │   │   └── AuthBackground3D.jsx
│   │   │   ├── common/          # Reusable UI components
│   │   │   │   ├── ConfirmDialog.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── SkeletonCard.jsx
│   │   │   │   └── ThemeToggle.jsx
│   │   │   ├── dashboard/       # Productivity analytics and filters
│   │   │   │   ├── ProductivityChart.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── StatCard.jsx
│   │   │   │   └── TodoFilter.jsx
│   │   │   ├── profile/         # User profile card and settings
│   │   │   │   └── ProfileCard.jsx
│   │   │   └── todos/           # Todo cards, grid, and modal
│   │   │       ├── TodoCard.jsx
│   │   │       ├── TodoList.jsx
│   │   │       └── TodoModal.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx  # Authentication state & methods
│   │   │   ├── ThemeContext.jsx # Theme switcher
│   │   │   └── ToastContext.jsx # Notification system
│   │   ├── hooks/
│   │   │   ├── use3DTilt.js     # Physics-based hover tilt
│   │   │   └── useTodos.js      # Encapsulated task CRUD & query sync
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js           # Axios instance with interceptors
│   │   ├── App.jsx              # Routing and Provider tree
│   │   ├── index.css            # Custom CSS & Glassmorphism styles
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js                # MongoDB Mongoose connection
│   ├── controllers/
│   │   ├── authController.js    # Register, login, logout, getMe
│   │   ├── todoController.js    # Todo CRUD, toggle, stats
│   │   └── userController.js    # Profile retrieval and update
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification & req.user guard
│   │   └── errorMiddleware.js   # 404 & Centralized error handler
│   ├── models/
│   │   ├── Todo.js              # Todo Schema with User ref & compound indexes
│   │   └── User.js              # User Schema with bcrypt hooks & methods
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth
│   │   ├── todoRoutes.js        # /api/todos
│   │   └── userRoutes.js        # /api/users
│   ├── utils/
│   │   └── generateToken.js     # JWT token generator
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   └── server.js                # Express app entry point
│
├── package.json                 # Top-level workspace script runner
└── README.md
```

---

## ⚡ Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB service running (`mongodb://127.0.0.1:27017`) or MongoDB Atlas URI

### 1. Clone & Install Dependencies

From the project root:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration

The backend environment file is configured in `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<ATLAS_CLUSTER>/TO_DO_LIST
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRE=30d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Run the Backend Server

```bash
cd server
npm run dev
```

*The Express API will start on `http://localhost:5000` and automatically connect to MongoDB.*

### 4. Run the Frontend Client

In a separate terminal:

```bash
cd client
npm run dev
```

*Open your browser and navigate to `http://localhost:5173`.*

---

## 🔌 API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Log in user and receive JWT | No |
| `POST` | `/api/auth/logout` | Invalidate cookie/session | No |
| `GET` | `/api/auth/me` | Fetch authenticated user data | Yes |

### Todos (`/api/todos`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/todos` | Query user's todos (search, filter, sort) | Yes |
| `POST` | `/api/todos` | Create a new task tied to `req.user._id` | Yes |
| `GET` | `/api/todos/stats` | Aggregated user productivity statistics | Yes |
| `GET` | `/api/todos/:id` | Fetch specific task (ownership checked) | Yes |
| `PUT` | `/api/todos/:id` | Update task (ownership checked) | Yes |
| `DELETE` | `/api/todos/:id` | Delete task (ownership checked) | Yes |
| `PATCH` | `/api/todos/:id/toggle`| Toggle completed boolean status | Yes |

### User Profile (`/api/users`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Get full profile with stats | Yes |
| `PUT` | `/api/users/profile` | Update profile info, avatar, or password | Yes |

---

## 🔒 Security & User Isolation Architecture

1. **Password Protection**: Passwords are never stored in plain text. A Mongoose pre-save hook utilizes `bcryptjs` with 10 salt rounds. Passwords are also excluded from queries by default with `select: false`.
2. **Stateless JWT Authorization**: When a user logs in or signs up, the server signs a JWT with the user's `_id`. The client stores the token and includes it as `Authorization: Bearer <token>` in the headers of all API requests.
3. **Strict Data Boundary Enforcement**:
   - Every Todo route is protected by `authMiddleware.js`, which verifies the token and populates `req.user`.
   - All database queries for todos include `{ user: req.user._id }`.
   - Update, toggle, and delete routes check `todo.user.toString() === req.user._id.toString()`. If an unauthorized ID is provided, the API responds with `403 Forbidden` or `404 Not Found`.

---

## 🚀 Production Deployment

1. **Frontend**: Run `npm run build` inside `client/`. The output files will be in `client/dist/`, which can be served on Vercel, Netlify, AWS S3/CloudFront, or statically via Express.
2. **Backend**: Host `server/` on Render, Railway, AWS ECS, or DigitalOcean with production environment variables (`NODE_ENV=production`, MongoDB Atlas connection string, secure `JWT_SECRET`).
