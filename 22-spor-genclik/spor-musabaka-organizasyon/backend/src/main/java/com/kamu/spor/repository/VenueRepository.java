package com.kamu.spor.repository;

import com.kamu.spor.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
    
    List<Venue> findByStatus(Venue.VenueStatus status);
    
    List<Venue> findByCity(String city);
    
    List<Venue> findByIsIndoor(Boolean isIndoor);
    
    List<Venue> findByHasLighting(Boolean hasLighting);
    
    List<Venue> findByHasChangingRooms(Boolean hasChangingRooms);
    
    List<Venue> findByHasMedicalRoom(Boolean hasMedicalRoom);
    
    @Query("SELECT v FROM Venue v WHERE v.capacity >= :minCapacity")
    List<Venue> findByMinCapacity(@Param("minCapacity") Integer minCapacity);
    
    @Query("SELECT v FROM Venue v WHERE v.name LIKE %:keyword% OR v.description LIKE %:keyword% OR v.address LIKE %:keyword%")
    List<Venue> findByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT v FROM Venue v WHERE v.city = :city AND v.status = :status")
    List<Venue> findByCityAndStatus(@Param("city") String city, @Param("status") Venue.VenueStatus status);
    
    @Query("SELECT v FROM Venue v WHERE v.isIndoor = :isIndoor AND v.hasLighting = :hasLighting")
    List<Venue> findByIndoorAndLighting(@Param("isIndoor") Boolean isIndoor, @Param("hasLighting") Boolean hasLighting);
} 