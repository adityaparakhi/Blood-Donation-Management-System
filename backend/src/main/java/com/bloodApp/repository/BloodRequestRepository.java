package com.bloodApp.repository;

import com.bloodApp.model.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {

    // Existing methods
    List<BloodRequest> findByRequesterEmail(String email);
    List<BloodRequest> findByDonorIdAndStatus(Long donorId, String status);
    List<BloodRequest> findByStatus(String status);

    // Updated methods for amount status (instead of payment status)
    List<BloodRequest> findByAmountStatus(BloodRequest.AmountStatus amountStatus);
    List<BloodRequest> findByStatusAndAmountStatus(String status, BloodRequest.AmountStatus amountStatus);
}
