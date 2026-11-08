package com.movieverse.dto;

import com.movieverse.entity.Booking;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record BookingResponse(
        Long id,
        String bookingReference,
        Long movieId,
        String movieTitle,
        Long theaterId,
        String theaterName,
        Long showtimeId,
        String showtime,
        LocalDate date,
        String seatNumbers,
        String foodItems,
        Double totalPrice,
        String paymentStatus,
        LocalDateTime bookingTime,
        String qrCodeData
) {
    public static BookingResponse from(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getBookingReference(),
                booking.getMovieId(),
                booking.getMovieTitle(),
                booking.getTheaterId(),
                booking.getTheaterName(),
                booking.getShowtimeId(),
                booking.getShowtimeLabel(),
                booking.getDate(),
                booking.getSeatNumbers(),
                booking.getFoodItems(),
                booking.getTotalPrice(),
                booking.getPaymentStatus(),
                booking.getBookingTime(),
                booking.getQrCodeData()
        );
    }
}
