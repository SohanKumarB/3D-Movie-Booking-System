# MovieVerse 3D frontend

React 19 and Vite application for the MovieVerse cinema-booking demo. Features include an interactive 3D lobby and seat map, a concessions preview, and clearly labeled demo QR passes. No real payment or seat reservation is performed.

## Requirements

- Node.js 20.19+ or 22.12+ (required by the current Vite release)
- npm
- Optional: the Spring Boot backend at `http://localhost:8080`

## Commands

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build locally
npm run lint
```

The Vite development server proxies `/api` to the backend. When the backend is offline or the movie catalog is empty, the UI falls back to its bundled sample catalog. If a server booking request fails, checkout displays the error and offers an explicitly demo-only pass; it never reports the failed request as a paid booking.
