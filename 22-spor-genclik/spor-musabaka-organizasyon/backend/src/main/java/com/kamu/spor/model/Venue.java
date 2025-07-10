package com.kamu.spor.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "venues")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Venue {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    private String address;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "postal_code")
    private String postalCode;
    
    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "capacity")
    private Integer capacity;
    
    @Column(name = "parking_capacity")
    private Integer parkingCapacity;
    
    @Column(name = "is_indoor")
    private Boolean isIndoor = false;
    
    @Column(name = "has_lighting")
    private Boolean hasLighting = false;
    
    @Column(name = "has_changing_rooms")
    private Boolean hasChangingRooms = false;
    
    @Column(name = "has_medical_room")
    private Boolean hasMedicalRoom = false;
    
    @Enumerated(EnumType.STRING)
    private VenueStatus status = VenueStatus.ACTIVE;
    
    @OneToMany(mappedBy = "venue", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Competition> competitions = new ArrayList<>();
    
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum VenueStatus {
        ACTIVE, INACTIVE, MAINTENANCE, CLOSED
    }
} 