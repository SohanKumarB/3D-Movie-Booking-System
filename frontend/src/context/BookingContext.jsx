import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedFood, setSelectedFood] = useState({});
  const [activeTicket, setActiveTicket] = useState(null);

  // Seat toggle helper
  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  // Food quantity modifier helper
  const updateFoodQty = (foodId, delta) => {
    setSelectedFood(prev => {
      const current = prev[foodId] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) {
        const copy = { ...prev };
        delete copy[foodId];
        return copy;
      }
      return { ...prev, [foodId]: updated };
    });
  };

  const clearBooking = () => {
    setSelectedMovie(null);
    setSelectedTheater(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setSelectedFood({});
  };

  return (
    <BookingContext.Provider value={{
      selectedMovie, setSelectedMovie,
      selectedTheater, setSelectedTheater,
      selectedShowtime, setSelectedShowtime,
      selectedDate, setSelectedDate,
      selectedSeats, setSelectedSeats, toggleSeat,
      selectedFood, updateFoodQty,
      activeTicket, setActiveTicket,
      clearBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
