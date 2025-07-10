package com.kamu.spor.dto;

import com.kamu.spor.model.Venue;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VenueDto {
    
    private Long id;
    private String name;
    private String description;
    private String address;
    private String city;
    private String postalCode;
    private String phoneNumber;
    private String email;
    private Integer capacity;
    private Integer parkingCapacity;
    private Boolean isIndoor;
    private Boolean hasLighting;
    private Boolean hasChangingRooms;
    private Boolean hasMedicalRoom;
    private Venue.VenueStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 