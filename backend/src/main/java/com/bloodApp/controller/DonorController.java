package com.bloodApp.controller;

import com.bloodApp.model.BloodRequest;

import com.bloodApp.model.Donation;
import com.bloodApp.model.User;
import com.bloodApp.dto.DonationDto;
import com.bloodApp.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donor")
@CrossOrigin(origins = "http://localhost:3000")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @GetMapping("/available-requests")
    public ResponseEntity<List<BloodRequest>> getAvailableRequests(@AuthenticationPrincipal String email) {
    	if (email == null) {
            return ResponseEntity.status(401).build(); 
        }
        return ResponseEntity.ok(donorService.getAvailableRequests());
    }

    @GetMapping("/donations")
    public ResponseEntity<List<DonationDto>> getMyDonations(
            @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(donorService.getMyDonations(token));
    }

    @PostMapping("/accept-request/{requestId}")
    public ResponseEntity<DonationDto> acceptRequest(
            @RequestHeader("Authorization") String token,
            @PathVariable Long requestId) {
        return ResponseEntity.ok(donorService.acceptRequest(token, requestId));
    }

    @PutMapping("/update-status/{donationId}")
    public ResponseEntity<DonationDto> updateDonationStatus(
            @PathVariable Long donationId,
            @RequestParam String status) {
        return ResponseEntity.ok(donorService.updateDonationStatus(donationId, status));
    }
}