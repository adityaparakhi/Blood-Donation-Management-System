package com.bloodApp.service;

import com.bloodApp.model.BloodRequest;
import com.bloodApp.model.User;
import com.bloodApp.repository.BloodRequestRepository;
import com.bloodApp.repository.UserRepository;
import com.bloodApp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReceiverService {

    @Autowired
    private BloodRequestRepository requestRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Create a new blood request (amount auto-calculated, amountStatus always PAID)
     */
    public BloodRequest createRequest(BloodRequest request, String token) {
        // Default status and date
        request.setStatus("pending");
        request.setDate(LocalDate.now());

        // Extract user from JWT token
        String email = jwtUtil.extractEmail(token.substring(7));
        User requester = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Receiver not found"));

        // Link requester
        request.setRequester(requester);
        request.setRequesterEmail(requester.getEmail());

        // Always calculate amount from urgency
        request.setAmount(calculateAmountFromUrgency(request.getUrgency()));

        // Always mark as PAID
        request.setAmountStatus(BloodRequest.AmountStatus.PAID);

        return requestRepo.save(request);
    }

    /**
     * Fetch requests by requester email
     */
    public List<BloodRequest> getRequestsByEmail(String email) {
        return requestRepo.findByRequesterEmail(email);
    }

    /**
     * Update existing request details
     */
    public BloodRequest updateRequest(Long id, BloodRequest updated) {
        BloodRequest existing = requestRepo.findById(id)
                .orElseThrow(() -> new IllegalStateException("Request not found"));

        existing.setHospital(updated.getHospital());
        existing.setContact(updated.getContact());
        existing.setUrgency(updated.getUrgency());
        existing.setStatus(updated.getStatus());

        // Always recalculate amount if urgency changes
        existing.setAmount(calculateAmountFromUrgency(updated.getUrgency()));

        // Update amountStatus if provided
        if (updated.getAmountStatus() != null) {
            existing.setAmountStatus(updated.getAmountStatus());
        }

        return requestRepo.save(existing);
    }

    /**
     * Delete a request
     */
    public void deleteRequest(Long id) {
        requestRepo.deleteById(id);
    }

    /**
     * Get donors matching blood group
     */
    public List<String> getDonorsByBloodGroup(String bloodGroup) {
        return userRepo.findAll()
                .stream()
                .filter(u -> u.getRole().equals("donor") && u.getBloodGroup().equalsIgnoreCase(bloodGroup))
                .map(User::getEmail)
                .toList();
    }

    /**
     * Helper method: map urgency -> amount
     */
    private int calculateAmountFromUrgency(String urgency) {
        if ("high".equalsIgnoreCase(urgency)) {
            return 500;
        } else if ("normal".equalsIgnoreCase(urgency)) {
            return 300;
        } else {
            return 100;
        }
    }
}
