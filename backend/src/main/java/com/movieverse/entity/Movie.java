package com.movieverse.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String synopsis;

    private String genre;
    private Integer durationMinutes;
    private Double rating;
    private String posterUrl;
    private String backdropUrl;
    private String trailerUrl;
    private String ageRating; // e.g. PG-13, R
    private String status; // NOW_SHOWING, COMING_SOON
    private Boolean is3dAvailable = true;
}
