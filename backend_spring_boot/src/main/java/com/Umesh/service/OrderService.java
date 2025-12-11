package com.Umesh.service;

import java.util.List;

import com.stripe.exception.StripeException;
import com.Umesh.Exception.CartException;
import com.Umesh.Exception.OrderException;
import com.Umesh.Exception.RestaurantException;
import com.Umesh.Exception.UserException;
import com.Umesh.model.Order;
import com.Umesh.model.PaymentResponse;
import com.Umesh.model.User;
import com.Umesh.request.CreateOrderRequest;

public interface OrderService {
	
	 public PaymentResponse createOrder(CreateOrderRequest order, User user) throws UserException, RestaurantException, CartException, StripeException;
	 
	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
	 
	 public void cancelOrder(Long orderId) throws OrderException;
	 
	 public List<Order> getUserOrders(Long userId) throws OrderException;
	 
	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;
	 

}
