package com.Umesh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.Umesh.Exception.UserException;
import com.Umesh.model.Notification;
import com.Umesh.model.User;
import com.Umesh.service.NotificationService;
import com.Umesh.service.UserService;

@RestController
@RequestMapping("/api")
public class NotificationController {
	
	@Autowired
	private NotificationService notificationService;
	@Autowired
	private UserService userService;
	
	@GetMapping("/notifications")
	public ResponseEntity<List<Notification>> findUsersNotification(
			@RequestHeader("Authorization") String jwt) throws UserException{
		User user=userService.findUserProfileByJwt(jwt);
		
		List<Notification> notifications=notificationService.findUsersNotification(user.getId());
		//return new ResponseEntity<List<Notification>>(notifications,HttpStatus.ACCEPTED);
        return ResponseEntity.ok(notifications);

    }
    @PatchMapping("/notifications/{id}/read")
    public ResponseEntity<String> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok("Notification marked as read");
    }


}
