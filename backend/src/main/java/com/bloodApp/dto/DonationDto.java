package com.bloodApp.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DonationDto {
    private Long id;
    private String donorName;
    private String receiverName;
    private String bloodGroup;
    private LocalDateTime donationDate;
    private String status;
}