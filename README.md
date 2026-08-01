MovieVerse 3D Platform
MovieVerse 3D has been successfully built and launched. It provides a 3D movie ticket booking experience featuring interactive 3D virtual cinema rooms, 3D seat selection with hover lift & glowing materials, 3D concessions snack ordering bar, digital QR code ticket generator, user authentication & role switcher, and Java Spring Boot backend APIs.

🎬 Key Features Implemented
1. 🎬 3D Virtual Cinema Lobby
Floating 3D Posters: Rendered in hardware-accelerated 3D space with ambient lighting and spotlight beams (VirtualLobby.jsx).
Interactive Poster Zoom: Clicking any floating poster zooms into the movie and transitions directly to seat selection.
2. 🪑 Interactive 3D Seat Selection Engine
Procedural 3D Seat Grid: Built with customized 3D meshes (pedestal, seat cushion, backrest, headrest, armrests, cup holders).
Dynamic State Palette:
🟢 Available: Emerald green accent
🔴 Booked: Dark crimson red
🔵 Selected: Neon Cyan glowing aura
🟣 VIP Seat: Purple gradient with custom pricing ($24.99)
Interactive Animations: Mouse hover lifts seat upward by 0.25 units; click rotates seat slightly and updates running subtotal in real time.
Cinematic Camera Angle Switcher:
Full Hall Overview
Face Screen View
VIP Row Inspector
3. 🍿 3D Concessions & Food Ordering Bar
Interactive 3D Models: 3D Popcorn bucket, 3D Soda cup with straw & ice, Gourmet Cheeseburger, and Pepperoni Pizza slice (Food3DBar.jsx).
360° Inspection: Full orbit control for inspecting snack models before adding to cart.
4. 🎟️ Digital QR Code Ticket Generator
Dynamic QR Code: Generates real scannable QR pass using qrcode.react with booking reference, seat numbers, showtime, and price breakdown.
Confetti Celebration: Triggers celebratory particle effect on checkout.
Actions: Print pass, download/copy booking reference.
5. ☕ Java Spring Boot REST Backend
Standard Spring Boot architecture (backend/):
Controllers: MovieController.java, BookingController.java
Entities: User.java, Movie.java, Theater.java, Showtime.java, Booking.java
Repositories: JPA Repositories for Database operations
Security & CORS Config: Enabled cross-origin access for frontend integration.
📁 Core Workspace Files Created
Frontend (frontend/)
App.jsx
VirtualLobby.jsx
CinemaHall3D.jsx
Seat3D.jsx
Food3DBar.jsx
BookingFlowPage.jsx
TicketModal.jsx
AIMovieBot.jsx
AdminPage.jsx
Backend (backend/)
pom.xml
MovieverseApplication.java
MovieController.java
BookingController.java
🚀 Running Locally
Frontend Dev Server: Currently running live at http://localhost:5173
Command to run frontend: cd frontend && npm run dev
Command to run backend: cd backend && mvn spring-boot:run
