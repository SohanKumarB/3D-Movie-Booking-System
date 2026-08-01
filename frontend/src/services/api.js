import { INITIAL_MOVIES, INITIAL_THEATERS, FOOD_ITEMS } from './mockData';

const BASE_URL = '/api';

export const api = {
  // Movies
  async getMovies() {
    try {
      const res = await fetch(`${BASE_URL}/movies`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Using local movies fallback:", e);
    }
    return INITIAL_MOVIES;
  },

  async getMovieById(id) {
    try {
      const res = await fetch(`${BASE_URL}/movies/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Using local movie fallback:", e);
    }
    return INITIAL_MOVIES.find(m => m.id === Number(id)) || INITIAL_MOVIES[0];
  },

  // Theaters
  async getTheaters() {
    try {
      const res = await fetch(`${BASE_URL}/theaters`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Using local theaters fallback:", e);
    }
    return INITIAL_THEATERS;
  },

  // Bookings
  async createBooking(bookingData) {
    try {
      const res = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Using local booking generator fallback:", e);
    }

    // Mock Booking Response
    return {
      id: Date.now(),
      bookingReference: 'MV-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      movieTitle: bookingData.movieTitle || 'Avengers: Secret Wars',
      theaterName: bookingData.theaterName || 'MovieVerse Grand IMAX 3D',
      showtime: bookingData.showtime || '06:15 PM',
      date: bookingData.date || new Date().toISOString().split('T')[0],
      seatNumbers: bookingData.seats ? bookingData.seats.join(', ') : 'C4, C5',
      foodItems: bookingData.foodSummary || 'None',
      totalPrice: bookingData.totalPrice || 39.98,
      paymentStatus: 'PAID',
      qrCodeData: JSON.stringify({
        ref: 'MV-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        movie: bookingData.movieTitle,
        seats: bookingData.seats
      })
    };
  },

  // Food Items
  getFoodItems() {
    return FOOD_ITEMS;
  }
};
