package com.bloodApp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "donor_id")
    private User donor;
    
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;
    
    private String bloodGroup;
    private LocalDateTime donationDate;
    private String status;

}