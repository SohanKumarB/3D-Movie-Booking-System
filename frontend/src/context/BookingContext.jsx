import React, { useState } from 'react';
import { BookingContext } from './bookingContext';

export const BookingProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedFood, setSelectedFood] = useState({});
  const [activeTicket, setActiveTicket] = useState(null);

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => prev.includes(seatId)
      ? prev.filter(id => id !== seatId)
      : [...prev, seatId]);
  };

  const updateFoodQty = (foodId, delta) => {
    setSelectedFood(prev => {
      const updated = Math.max(0, (prev[foodId] || 0) + delta);
      if (updated === 0) {
        const copy = { ...prev };
        delete copy[foodId];
        return copy;
      }
      return { ...prev, [foodId]: updated };
    });
  };

  const clearBooking = () => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    setSelectedMovie(null);
    setSelectedTheater(null);
    setSelectedShowtime(null);
    setSelectedDate(today.toISOString().slice(0, 10));
    setSelectedSeats([]);
    setSelectedFood({});
    setActiveTicket(null);
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
