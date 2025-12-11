package com.Umesh.config;

import com.Umesh.domain.USER_ROLE;
import com.Umesh.model.User;
import com.Umesh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class SuperAdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        String email = "superadmin@example.com";

        // Check if admin exists
        if (userRepository.findByEmail(email) == null) {
            User admin = new User();
            admin.setFullName("Super Admin");
            admin.setEmail(email);
            admin.setRole(USER_ROLE.ROLE_ADMIN);
            admin.setStatus("APPROVED");

            // Password can be anything you decide
            admin.setPassword(passwordEncoder.encode("Admin@1234"));

            userRepository.save(admin);

            System.out.println("🔥 Super Admin Created Successfully!");
        } else {
            System.out.println("✔ Super Admin already exists.");
        }
    }
}
