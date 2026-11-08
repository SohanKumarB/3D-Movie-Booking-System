import React, { lazy, Suspense, useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RainOverlay } from './components/RainOverlay';
import { AIMovieBot } from './components/AIMovieBot';
import { api } from './services/api';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const LobbyPage = lazy(() => import('./pages/LobbyPage').then(module => ({ default: module.LobbyPage })));
const MoviesPage = lazy(() => import('./pages/MoviesPage').then(module => ({ default: module.MoviesPage })));
const BookingFlowPage = lazy(() => import('./pages/BookingFlowPage').then(module => ({ default: module.BookingFlowPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(module => ({ default: module.AdminPage })));

export function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isRainActive, setIsRainActive] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await api.getMovies();
      setMovies(data);
    }
    loadData();
  }, []);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setCurrentPage('booking');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080E] text-gray-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Cinematic Ambient Rain Overlay */}
      <RainOverlay isActive={isRainActive} />

      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isRainActive={isRainActive}
        onToggleRain={() => setIsRainActive(!isRainActive)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-6">
        <Suspense fallback={<div role="status" className="glass-panel rounded-2xl p-8 text-center text-sm text-cyan-200">Loading cinema experience…</div>}>
          {currentPage === 'home' && (
            <HomePage movies={movies} onSelectMovie={handleSelectMovie} onNavigate={setCurrentPage} />
          )}

          {currentPage === 'lobby' && (
            <LobbyPage movies={movies} onSelectMovie={handleSelectMovie} onNavigate={setCurrentPage} />
          )}

          {currentPage === 'movies' && (
            <MoviesPage movies={movies} onSelectMovie={handleSelectMovie} />
          )}

          {currentPage === 'booking' && (
            <BookingFlowPage movie={selectedMovie || movies[0]} onBack={() => setCurrentPage('home')} />
          )}

          {currentPage === 'profile' && (
            <ProfilePage />
          )}

          {currentPage === 'admin' && (
            <AdminPage movies={movies} setMovies={setMovies} />
          )}
        </Suspense>
      </main>

      {/* Floating AI Movie Assistant */}
      <AIMovieBot movies={movies} onSelectMovie={handleSelectMovie} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <MainApp />
      </BookingProvider>
    </AuthProvider>
  );
}
