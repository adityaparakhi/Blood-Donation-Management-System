package com.bloodApp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import com.bloodApp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class TestController {

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/api/test/protected")
    public ResponseEntity<?> testProtected(@RequestHeader("Authorization") String authHeader) {
        try {
            if(authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);
            return ResponseEntity.ok("Hello " + email + ", you accessed a protected route!");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }
}