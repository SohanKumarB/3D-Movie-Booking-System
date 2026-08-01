import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RainOverlay } from './components/RainOverlay';
import { AIMovieBot } from './components/AIMovieBot';
import { HomePage } from './pages/HomePage';
import { LobbyPage } from './pages/LobbyPage';
import { MoviesPage } from './pages/MoviesPage';
import { BookingFlowPage } from './pages/BookingFlowPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { api } from './services/api';

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
