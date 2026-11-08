import { useContext } from 'react';
import { BookingContext } from './bookingContext';

export const useBooking = () => useContext(BookingContext);
