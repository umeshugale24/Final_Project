package com.Umesh.service;

import java.util.List;

import com.Umesh.Exception.ReviewException;
import com.Umesh.model.Review;
import com.Umesh.model.User;
import com.Umesh.request.ReviewRequest;

public interface ReviewSerive {

    Review addReview(User userId, ReviewRequest request);

    List<Review> getReviewsForRestaurant(Long restaurantId);

    Review updateReview(Long reviewId, Long userId, ReviewRequest request);

    void deleteReview(Long reviewId, Long userId);
}
