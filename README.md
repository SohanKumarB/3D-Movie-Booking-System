# MovieVerse 3D — Movie Booking Demo

MovieVerse is an educational cinema-booking prototype built with React, Vite, Three.js, and Spring Boot. It demonstrates a virtual lobby, interactive seat selection, concession browsing, and QR-style demo passes.

> **Demo only:** this project does not process payments, reserve real seats, authenticate users, or issue valid cinema tickets. Demo passes are labeled as such and their QR codes are not valid for entry. The admin/user switch is a frontend preview control, not access control. Do not deploy this project as a production booking or payment service without implementing authentication, authorization, verified payment processing, and atomic seat reservations.

## Stack

- Frontend: React 19, Vite, React Three Fiber, Three.js, Tailwind CSS
- Backend: Java 17+, Spring Boot 3.2, Spring Data JPA, H2 for local development
- Package/build tools: npm and Maven

## Project layout

```text
backend/   Spring Boot REST API and H2 configuration
frontend/  React/Vite interactive demo
```

## Run locally

### Backend

Install JDK 17+ and Maven 3.8+, then run:

```bash
cd backend
mvn spring-boot:run
```

The API listens on `http://localhost:8080`. The in-memory H2 database is for local development only; its data is lost when the process restarts. The H2 console is available at `http://localhost:8080/h2-console` with JDBC URL `jdbc:h2:mem:movieversedb`, username `sa`, and password `password`.

### Frontend

In another terminal:

```bash
cd frontend
npm ci
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` requests to `http://localhost:8080`. The frontend uses its bundled sample catalog when the backend is unavailable or has no movie records, so the UI can also be explored without the API.

## API

- `GET /api/movies` — public movie catalog
- `GET /api/movies/{id}` — public movie details
- `POST /api/bookings` — creates a **demo-only** booking record and returns `paymentStatus: DEMO`

The booking endpoint validates required fields and returns a response DTO rather than serializing persistence entities. Other routes are denied by the demo security configuration unless explicitly enabled. There is no real authentication or payment verification in this repository.

## Checks

From `frontend/`:

```bash
npm run build
npm run lint
npm audit
```

From `backend/`:

```bash
mvn test
mvn package
```

## License

This project is provided for educational and demonstration purposes. See the repository history for applicable licensing details.
