package com.bloodApp.service;

import com.bloodApp.exception.ResourceNotFoundException;
import com.bloodApp.model.*;
import com.bloodApp.dto.DonationDto;
import com.bloodApp.repository.*;
import com.bloodApp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonorService {

    @Autowired private BloodRequestRepository bloodRequestRepo;
    @Autowired private DonationRepository donationRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private JwtUtil jwtUtil;

    public List<BloodRequest> getAvailableRequests() {
        return bloodRequestRepo.findByStatus("pending");
    }

    public List<DonationDto> getMyDonations(String token) {
    	
        User donor = getUserFromToken(token);
        System.out.println("Fetching donations for donor: " + donor.getEmail());
        return donationRepo.findByDonorId(donor.getId())
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

    }

    public DonationDto acceptRequest(String token, Long requestId) {
        User donor = getUserFromToken(token);
        BloodRequest request = bloodRequestRepo.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        if (!donor.getBloodGroup().equals(request.getBloodGroup())) {
            throw new IllegalArgumentException("Blood group mismatch");
        }

        User receiver = request.getRequester();
        if (receiver == null) {
            throw new IllegalStateException("No requester found for this request");
        }

        Donation donation = new Donation();
        donation.setDonor(donor);
        donation.setReceiver(receiver);
        donation.setBloodGroup(request.getBloodGroup());
        donation.setDonationDate(LocalDateTime.now());
        donation.setStatus("scheduled");

        request.setStatus("accepted");
        request.setDonorId(donor.getId());
        bloodRequestRepo.save(request);

        return convertToDto(donationRepo.save(donation));
    }

    public DonationDto updateDonationStatus(Long donationId, String status) {
        Donation donation = donationRepo.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found"));

        donation.setStatus(status);
        Donation updatedDonation = donationRepo.save(donation);

        return convertToDto(updatedDonation);
    }

    private User getUserFromToken(String token) {
        String email = jwtUtil.extractEmail(token.substring(7));
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
       

    }

    private DonationDto convertToDto(Donation donation) {
        DonationDto dto = new DonationDto();
        dto.setId(donation.getId());

        if (donation.getDonor() != null) {
            dto.setDonorName(donation.getDonor().getName());
        } else {
            dto.setDonorName("Anonymous Donor");
        }

        if (donation.getReceiver() != null) {
            dto.setReceiverName(donation.getReceiver().getName());
        } else {
            dto.setReceiverName("Anonymous Receiver");
        }

        dto.setBloodGroup(donation.getBloodGroup());
        dto.setDonationDate(donation.getDonationDate());
        dto.setStatus(donation.getStatus());

        return dto;
    }
}
