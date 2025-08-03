package com.bloodApp.service;

import com.bloodApp.model.User;
import com.bloodApp.model.BloodRequest;
import com.bloodApp.repository.UserRepository;
import com.bloodApp.repository.BloodRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminService {

    @Autowired private UserRepository userRepo;
    @Autowired private BloodRequestRepository requestRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public void updateUserRole(Long userId, String role) {
        User user = userRepo.findById(userId).orElseThrow();
        user.setRole(role);
        userRepo.save(user);
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

    public List<BloodRequest> getAllRequests() {
        return requestRepo.findAll();
    }

    public void updateRequestStatus(Long id, String status) {
        BloodRequest req = requestRepo.findById(id).orElseThrow();
        req.setStatus(status);
        requestRepo.save(req);
    }

    public void deleteRequest(Long id) {
        requestRepo.deleteById(id);
    }

    public Map<String, Long> getDashboardStats() {
        List<User> allUsers = userRepo.findAll();
        List<BloodRequest> allReqs = requestRepo.findAll();

        long donors = allUsers.stream().filter(u -> u.getRole().equalsIgnoreCase("donor")).count();
        long receivers = allUsers.stream().filter(u -> u.getRole().equalsIgnoreCase("receiver")).count();
        long pending = allReqs.stream().filter(r -> r.getStatus().equalsIgnoreCase("pending")).count();
        long fulfilled = allReqs.stream().filter(r -> r.getStatus().equalsIgnoreCase("fulfilled")).count();

        Map<String, Long> stats = new HashMap<>();
        stats.put("totalDonors", donors);
        stats.put("totalReceivers", receivers);
        stats.put("pendingRequests", pending);
        stats.put("fulfilledRequests", fulfilled);

        return stats;
    }
}
