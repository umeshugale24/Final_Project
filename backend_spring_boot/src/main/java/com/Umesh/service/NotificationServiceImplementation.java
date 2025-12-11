package com.Umesh.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Umesh.model.Notification;
import com.Umesh.model.Order;
import com.Umesh.model.Restaurant;
import com.Umesh.model.User;
import com.Umesh.repository.NotificationRepository;

@Service
public class NotificationServiceImplementation implements NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;
	
	@Override
	public Notification sendOrderStatusNotification(Order order) {
		Notification notification = new Notification();
		notification.setMessage(" Thank you for your patience, your order No. " + order.getId()+ "is " +order.getOrderStatus()+".");
		notification.setCustomer(order.getCustomer());
		notification.setSentAt(new Date());
        notification.setRestaurant(order.getRestaurant());

        return notificationRepository.save(notification);
	}

	@Override
	public void sendRestaurantNotification(Restaurant restaurant, String message) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void sendPromotionalNotification(User user, String message) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Notification> findUsersNotification(Long userId) {
		// TODO Auto-generated method stub
		return notificationRepository.findByCustomerId(userId);
	}
    public void markAsRead(Long id) {
        Notification noti = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        noti.setReadStatus(true);
        notificationRepository.save(noti);
    }


}
