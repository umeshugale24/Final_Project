package com.Umesh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.Umesh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Umesh.Exception.ReviewException;
import com.Umesh.model.Restaurant;
import com.Umesh.model.Review;
import com.Umesh.model.User;
import com.Umesh.repository.RestaurantRepository;
import com.Umesh.repository.ReviewRepository;
import com.Umesh.request.ReviewRequest;
@Service
public class ReviewServiceImplementation implements ReviewSerive {
    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RestaurantRepository restaurantRepo;

    @Override
    public Review addReview(User userId, ReviewRequest request) {

        // 1. Load user from database
        User user = userRepo.findById(userId.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Load restaurant from database
        Restaurant restaurant = restaurantRepo.findById(request.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // 3. Create new Review object
        Review review = new Review();
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setUser(user);            // who wrote it
        review.setRestaurant(restaurant);// for which restaurant
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());

        // 4. Save to DB
        return reviewRepo.save(review);
    }

    @Override
    public List<Review> getReviewsForRestaurant(Long restaurantId) {
        // Simply delegate to repository
        return reviewRepo.findByRestaurantId(restaurantId);
    }

    @Override
    public Review updateReview(Long reviewId, Long userId, ReviewRequest request) {

        Review review = reviewRepo.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        // Only allow owner to edit
        if (!review.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only edit your own review");
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setUpdatedAt(LocalDateTime.now());

        return reviewRepo.save(review);
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) {

        Review review = reviewRepo.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only delete your own review");
        }

        reviewRepo.delete(review);
    }
}

