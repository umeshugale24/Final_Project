package com.Umesh.request;

import lombok.Data;

@Data
public class ReviewRequest {

    private Long restaurantId;
    private int rating;
    private String comment;

	
}
