# 🎬 MovieVerse 3D - Movie Ticket Booking System

Welcome to **MovieVerse 3D**, an interactive cinema ticket booking platform featuring an immersive 3D seat selection experience powered by **React**, **Three.js**, and **Spring Boot**.

---

## 🚀 Quick Overview

- **Interactive 3D Theater**: Pick your seat in a realistic 3D cinema layout with smooth camera movements and lighting effects.
- **Full-Stack Architecture**: React 19 frontend connected to a robust Spring Boot REST backend.
- **Seat Booking & QR Tickets**: Real-time seat locking, dynamic pricing, and downloadable QR code tickets upon booking.
- **User & Admin Controls**: Movie listings, showtimes, profile history, and admin dashboard for cinema management.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Three.js, `@react-three/fiber`, `@react-three/drei`, TailwindCSS, Framer Motion |
| **Backend** | Java 17, Spring Boot 3.2.3, Spring Data JPA, Spring Security, JWT |
| **Database** | Embedded H2 Database (Dev) / MySQL-ready (Prod) |
| **Build Tools** | npm (Frontend), Maven (Backend) |

---

## 📁 Project Structure

```text
3D Movie Ticket Booking/
├── backend/                  # Java Spring Boot REST API
│   ├── src/main/java/        # Application source code (Controllers, Entities, Repositories)
│   ├── src/main/resources/   # Configuration (application.yml)
│   └── pom.xml               # Maven dependencies
│
└── frontend/                 # React + Vite 3D Web Application
    ├── src/
    │   ├── 3d/               # Three.js / R3F seat components & 3D canvas logic
    │   ├── components/       # UI Components (Navbar, Cards, Modals)
    │   ├── context/          # Booking state management & authentication
    │   ├── pages/            # Page Views (Home, Movies, BookingFlow, Profile, Admin)
    │   └── services/         # Axios API connection to backend
    ├── package.json          # Node dependencies & scripts
    └── vite.config.js        # Vite build configuration
```

---

## 📋 Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **JDK 17** or higher - [Download OpenJDK / Oracle JDK](https://adoptium.net/)
- **Maven** (v3.8+) or use your IDE's embedded Maven wrapper

---

## ⚡ Step-by-Step Setup Guide

### 1️⃣ Run the Backend (Spring Boot API)

Open a terminal window and execute:

```bash
# Navigate to backend directory
cd backend

# Run with Maven
mvn spring-boot:run
```

- **Backend API**: `http://localhost:8080`
- **H2 Database Console**: `http://localhost:8080/h2-console`
  - **JDBC URL**: `jdbc:h2:mem:movieversedb`
  - **Username**: `sa`
  - **Password**: `password`

---

### 2️⃣ Run the Frontend (React + Vite)

Open a **new** terminal window and execute:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (First time only)
npm install

# Start development server
npm run dev
```

- **Frontend App**: `http://localhost:5173`

---

## ✨ Features Highlight

1. 💺 **3D Seat Selection**:
   - Click and hover over 3D chair models.
   - Distinct colors for available, selected, and reserved seats.
   - Screen perspective preview mode.

2. 🎟️ **Instant QR Code Generation**:
   - Every confirmed ticket includes a unique QR code for check-in verification.

3. 🔑 **Authentication & Security**:
   - Secure login and registration powered by JWT tokens.

4. 📊 **Admin Dashboard**:
   - Manage active movies, update showtimes, and inspect screen occupancy.

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/movies` | Get list of available movies | Public |
| `GET` | `/api/movies/{id}` | Get movie details by ID | Public |
| `POST` | `/api/bookings` | Create a new ticket booking | User / Auth |
| `GET` | `/api/bookings/user/{userId}` | Fetch user booking history | User / Auth |

---

## 💡 Troubleshooting

- **Frontend can't connect to Backend**: Ensure backend is running on `http://localhost:8080` before making API calls.
- **Port 8080 is already in use**: Update `server.port` in `backend/src/main/resources/application.yml` or stop existing processes using port 8080.
- **Three.js rendering issues**: Verify your browser supports WebGL (Chrome, Edge, Firefox, and Safari all support WebGL by default).

---

## 📄 License

This project is created for educational and demonstration purposes.
