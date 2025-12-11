package com.Umesh.service;

import java.util.List;

import com.Umesh.model.Notification;
import com.Umesh.model.Order;
import com.Umesh.model.Restaurant;
import com.Umesh.model.User;

public interface NotificationService {
	
	public Notification sendOrderStatusNotification(Order order);
	public void sendRestaurantNotification(Restaurant restaurant, String message);
	public void sendPromotionalNotification(User user, String message);
	
	public List<Notification> findUsersNotification(Long userId);
    public void markAsRead(Long id);
}
