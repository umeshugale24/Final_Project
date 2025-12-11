package com.Umesh.service;

import java.util.List;

import com.Umesh.Exception.FoodException;
import com.Umesh.Exception.RestaurantException;
import com.Umesh.model.Category;
import com.Umesh.model.Food;
import com.Umesh.model.Restaurant;
import com.Umesh.request.CreateFoodRequest;

public interface FoodService {

	public Food createFood(CreateFoodRequest req,Category category,
						   Restaurant restaurant) throws FoodException, RestaurantException;

	void deleteFood(Long foodId) throws FoodException;
	
	public List<Food> getRestaurantsFood(Long restaurantId,
			boolean isVegetarian, boolean isNonveg, boolean isSeasonal,String foodCategory) throws FoodException;
	
	public List<Food> searchFood(String keyword);
	
	public Food findFoodById(Long foodId) throws FoodException;

	public Food updateAvailibilityStatus(Long foodId) throws FoodException;
}
