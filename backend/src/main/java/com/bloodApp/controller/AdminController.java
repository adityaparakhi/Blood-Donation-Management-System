package com.bloodApp.controller;

import com.bloodApp.model.User;
import com.bloodApp.model.BloodRequest;
import com.bloodApp.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @PutMapping("/users/{id}")
    public void updateUserRole(@PathVariable Long id, @RequestParam String role) {
        adminService.updateUserRole(id, role);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
    }

    @GetMapping("/requests")
    public List<BloodRequest> getAllRequests() {
        return adminService.getAllRequests();
    }

    @PutMapping("/requests/{id}")
    public void updateRequestStatus(@PathVariable Long id, @RequestParam String status) {
        adminService.updateRequestStatus(id, status);
    }

    @DeleteMapping("/requests/{id}")
    public void deleteRequest(@PathVariable Long id) {
        adminService.deleteRequest(id);
    }

    
    @GetMapping("/dashboard")
    public Map<String, Long> dashboardStats() {
        return adminService.getDashboardStats();
    }
}
