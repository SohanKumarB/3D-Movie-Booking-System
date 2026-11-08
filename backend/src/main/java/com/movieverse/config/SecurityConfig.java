package com.movieverse.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain apiSecurity(HttpSecurity http) throws Exception {
        // This prototype has no real sign-in or payment integration. The only public
        // write operation creates a clearly marked demo booking; production must add
        // authentication, ownership checks, and a verified payment provider.
        http.csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/movies", "/api/movies/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/bookings").permitAll()
                        .anyRequest().denyAll());
        return http.build();
    }
}
