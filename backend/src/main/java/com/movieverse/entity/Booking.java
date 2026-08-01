package com.movieverse.entity;

import jakarta.persistence.*;
import lombok.*;
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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    private String seatNumbers; // e.g. "A1,A2"
    private String foodItems;   // e.g. "Popcorn Combo x1"
    private Double totalPrice;
    private String paymentStatus; // PAID, CANCELLED
    private LocalDateTime bookingTime;
    private String qrCodeData;
}
