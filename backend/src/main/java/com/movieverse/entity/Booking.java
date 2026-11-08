package com.movieverse.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String bookingReference;

    // Optional relations reserved for a future authenticated production booking flow.
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    @Column(name = "selected_movie_id")
    private Long movieId;

    private String movieTitle;

    @Column(name = "selected_theater_id")
    private Long theaterId;

    private String theaterName;
    @Column(name = "selected_showtime_id")
    private Long showtimeId;
    private String showtimeLabel;
    @Column(name = "booking_date")
    private LocalDate date;

    @Column(length = 1000)
    private String seatNumbers;

    @Column(length = 2000)
    private String foodItems;

    private Double totalPrice;

    // This prototype issues demo tickets only; it does not process payment.
    private String paymentStatus;

    private LocalDateTime bookingTime;
    private String qrCodeData;
}
