package com.movieverse.controller;

import com.movieverse.entity.Booking;
import com.movieverse.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }

    @GetMapping("/{reference}")
    public ResponseEntity<Booking> getBookingByRef(@PathVariable String reference) {
        return bookingRepository.findByBookingReference(reference)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        if (booking.getBookingReference() == null) {
            booking.setBookingReference("MV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        booking.setBookingTime(LocalDateTime.now());
        booking.setPaymentStatus("PAID");
        return ResponseEntity.ok(bookingRepository.save(booking));
    }
}
