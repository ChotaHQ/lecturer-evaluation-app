# Lecturer Evaluation App

A fullstack web application for managing student evaluations of lecturers, built with React (Vite + TypeScript) on the frontend and Node.js (Express + TypeScript) on the backend.

## Tech Stack

### Frontend
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Language:** TypeScript 5.9.3
- **Routing:** React Router DOM 7.13.0
- **Styling:** TailwindCSS 3.4.19
- **Linting:** ESLint 9.39.1

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.2.1
- **Language:** TypeScript 5.9.3
- **Dev Tools:** Nodemon, ts-node

## Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── index.html
│   ├── .gitignore
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── eslint.config.js
│   ├── tsconfig.node.json
│   ├── tsconfig.app.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── .gitignore
│   └── tsconfig.json
│
├── README.md
├── .gitignore
├── studentsRatings.json
└── APPLICATION_FLOW.md

```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd project-root
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

## Running the Application

### Development Mode

#### Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:3000`.

#### Start the Frontend Development Server

Open a new terminal window:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173` (Vite's default port).

## Available Scripts

### Frontend Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Builds the app for production |
| `npm run lint` | Runs ESLint to check code quality |
| `npm run preview` | Previews the production build locally |

### Backend Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server with auto-restart |
| `npm run build` | Compiles TypeScript to JavaScript |
| `npm start` | Runs the compiled production server |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
