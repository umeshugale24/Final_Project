package com.Umesh.controller;

import java.util.List;

import com.Umesh.config.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Umesh.Exception.ReviewException;
import com.Umesh.Exception.UserException;
import com.Umesh.model.Review;
import com.Umesh.model.User;
import com.Umesh.request.ReviewRequest;
import com.Umesh.service.ReviewSerive;
import com.Umesh.service.UserService;

@RestController
@RequestMapping("/api")
public class ReviewController {
    @Autowired
    private ReviewSerive reviewService;

    @Autowired
    private UserService userService; // however you already decode JWT

    // Create review
    @PostMapping("/reviews")
    public ResponseEntity<Review> createReview(
            @RequestHeader("Authorization") String jwt,
            @RequestBody ReviewRequest request) throws UserException {

        // 1. Extract user id from token instead of trusting client
        User userId = userService.findUserProfileByJwt(jwt);

        // 2. Delegate to service
        Review created = reviewService.addReview(userId, request);

        // 3. Return created review
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Get all reviews for a restaurant
    @GetMapping("/restaurants/{restaurantId}/reviews")
    public ResponseEntity<List<Review>> getReviewsForRestaurant(
            @PathVariable Long restaurantId) {

        List<Review> reviews = reviewService.getReviewsForRestaurant(restaurantId);
        return ResponseEntity.ok(reviews);
    }
	}



