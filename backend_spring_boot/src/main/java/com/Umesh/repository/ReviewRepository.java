package com.Umesh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Umesh.model.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByRestaurantId(Long restaurantId);
}
