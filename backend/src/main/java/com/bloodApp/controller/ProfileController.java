package com.bloodApp.controller;

import com.bloodApp.model.User;
import com.bloodApp.repository.UserRepository;
import com.bloodApp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.extractEmail(authHeader.substring(7));
        return userRepo.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String authHeader,
                                           @RequestBody User updatedUser) {
        String email = jwtUtil.extractEmail(authHeader.substring(7));
        return userRepo.findByEmail(email)
                .map(user -> {
                    user.setName(updatedUser.getName());
                    user.setBloodGroup(updatedUser.getBloodGroup());
                    user.setContact(updatedUser.getContact());
                    userRepo.save(user);
                    return ResponseEntity.ok("Profile updated");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}