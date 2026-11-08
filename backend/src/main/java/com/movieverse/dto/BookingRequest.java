package com.movieverse.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDate;
import java.util.List;

public record BookingRequest(
        @NotNull Long movieId,
        @NotBlank String movieTitle,
        @NotNull Long theaterId,
        @NotBlank String theaterName,
        @NotNull Long showtimeId,
        @NotBlank String showtime,
        @NotNull @FutureOrPresent LocalDate date,
        @NotEmpty List<@NotBlank String> seats,
        @NotBlank String foodSummary,
        @NotNull @PositiveOrZero Double totalPrice
) {
}
