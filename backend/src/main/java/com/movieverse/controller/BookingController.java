package com.movieverse.controller;

import com.movieverse.dto.BookingRequest;
import com.movieverse.dto.BookingResponse;
import com.movieverse.entity.Booking;
import com.movieverse.repository.BookingRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookingResponse> bookings = bookingRepository.findAll().stream()
                .map(BookingResponse::from)
                .toList();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{reference}")
    public ResponseEntity<BookingResponse> getBookingByRef(@PathVariable String reference) {
        return bookingRepository.findByBookingReference(reference)
                .map(BookingResponse::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request) {
        String reference = "MV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        Booking booking = Booking.builder()
                .bookingReference(reference)
                .movieId(request.movieId())
                .movieTitle(request.movieTitle())
                .theaterId(request.theaterId())
                .theaterName(request.theaterName())
                .showtimeId(request.showtimeId())
                .showtimeLabel(request.showtime())
                .date(request.date())
                .seatNumbers(String.join(", ", request.seats()))
                .foodItems(request.foodSummary())
                .totalPrice(request.totalPrice())
                .paymentStatus("DEMO")
                .bookingTime(LocalDateTime.now())
                .qrCodeData("MOVIEVERSE_DEMO_ONLY:" + reference)
                .build();

        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.status(HttpStatus.CREATED).body(BookingResponse.from(savedBooking));
    }
}
