package com.movieverse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MovieverseApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieverseApplication.class, args);
        System.out.println("🎬 MovieVerse 3D Spring Boot Backend running on http://localhost:8080");
    }
}
