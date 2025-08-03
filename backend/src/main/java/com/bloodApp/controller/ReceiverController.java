package com.bloodApp.controller;

import com.bloodApp.model.BloodRequest;
import com.bloodApp.service.ReceiverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receiver")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceiverController {

    @Autowired
    private ReceiverService receiverService;

    /**
     * Create new blood request (amount auto-set based on urgency, amountStatus always PAID)
     */
    @PostMapping("/requests")
    public BloodRequest createRequest(@RequestBody BloodRequest request,
                                      @RequestHeader("Authorization") String token) {

        // Calculate amount based on urgency
        int amount = 0;
        if ("high".equalsIgnoreCase(request.getUrgency())) {
            amount = 500;
        } else if ("normal".equalsIgnoreCase(request.getUrgency())) {
            amount = 300;
        } else if ("low".equalsIgnoreCase(request.getUrgency())) {
            amount = 100;
        }
        request.setAmount(amount);

        // Always mark as PAID (enum value)
        request.setAmountStatus(BloodRequest.AmountStatus.PAID);

        return receiverService.createRequest(request, token);
    }

    /**
     * Fetch user-specific requests
     */
    @GetMapping("/requests/{email}")
    public List<BloodRequest> getMyRequests(@PathVariable String email) {
        return receiverService.getRequestsByEmail(email);
    }

    /**
     * Update a request
     */
    @PutMapping("/requests/{id}")
    public BloodRequest updateRequest(@PathVariable Long id, @RequestBody BloodRequest updatedRequest) {
        return receiverService.updateRequest(id, updatedRequest);
    }

    /**
     * Delete request
     */
    @DeleteMapping("/requests/{id}")
    public void deleteRequest(@PathVariable Long id) {
        receiverService.deleteRequest(id);
    }

    /**
     * Find donors by blood group
     */
    @GetMapping("/donors")
    public List<String> findDonorsByBloodGroup(@RequestParam String bloodGroup) {
        return receiverService.getDonorsByBloodGroup(bloodGroup);
    }
}
