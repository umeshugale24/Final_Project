package com.Umesh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Umesh.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	PasswordResetToken findByToken(String token);
}
