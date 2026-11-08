import { INITIAL_MOVIES, INITIAL_THEATERS, FOOD_ITEMS } from './mockData';

const BASE_URL = '/api';

async function requestJson(url, options) {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error('The MovieVerse API is unavailable. Check that the backend is running.');
  }

  const body = await response.text();
  let data = null;
  if (body) {
    try {
      data = JSON.parse(body);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || `The MovieVerse API returned an error (${response.status}).`);
  }
  return data;
}

function normalizeBooking(response, bookingData) {
  const seatNumbers = response?.seatNumbers
    || response?.seats?.join(', ')
    || bookingData.seats.join(', ');

  return {
    ...bookingData,
    ...response,
    showtime: response?.showtime?.time || response?.showtime || bookingData.showtime,
    date: response?.date || bookingData.date,
    seatNumbers,
    foodItems: response?.foodItems || bookingData.foodSummary,
    paymentStatus: response?.paymentStatus || 'DEMO'
  };
}

export const api = {
  // Movies
  async getMovies() {
    try {
      const movies = await requestJson(`${BASE_URL}/movies`);
      if (Array.isArray(movies) && movies.length > 0) return movies;
      console.info('The movie catalog is empty; showing the included demo catalog.');
    } catch (error) {
      console.warn('Using the included movie catalog:', error.message);
    }
    return INITIAL_MOVIES;
  },

  async getMovieById(id) {
    try {
      const movie = await requestJson(`${BASE_URL}/movies/${id}`);
      if (movie) return movie;
    } catch (error) {
      console.warn('Using a local movie lookup:', error.message);
    }
    return INITIAL_MOVIES.find(movie => String(movie.id) === String(id)) || null;
  },

  // Theaters
  async getTheaters() {
    try {
      const theaters = await requestJson(`${BASE_URL}/theaters`);
      if (Array.isArray(theaters) && theaters.length > 0) return theaters;
      console.info('The theater catalog is empty; showing the included demo catalog.');
    } catch (error) {
      console.warn('Using the included theater catalog:', error.message);
    }
    return INITIAL_THEATERS;
  },

  // Bookings
  async createBooking(bookingData) {
    const response = await requestJson(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return normalizeBooking(response, bookingData);
  },

  createDemoBooking(bookingData) {
    const bookingReference = `MV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    return normalizeBooking({
      id: bookingReference,
      bookingReference,
      paymentStatus: 'DEMO',
      qrCodeData: JSON.stringify({
        type: 'MOVIEVERSE_DEMO_ONLY',
        bookingReference,
        movieTitle: bookingData.movieTitle,
        seats: bookingData.seats
      })
    }, bookingData);
  },

  // Food Items
  getFoodItems() {
    return FOOD_ITEMS;
  }
};
