package com.kamu.spor.controller;

import com.kamu.spor.dto.UserDto;
import com.kamu.spor.dto.request.CreateUserRequest;
import com.kamu.spor.model.User;
import com.kamu.spor.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Kullanıcı Yönetimi", description = "Kullanıcı işlemleri için API endpoint'leri")
public class UserController {
    
    private final UserService userService;
    
    @GetMapping
    @Operation(summary = "Tüm kullanıcıları listele", description = "Sistemdeki tüm kullanıcıları getirir")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Kullanıcı detayı", description = "ID'ye göre kullanıcı detayını getirir")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/username/{username}")
    @Operation(summary = "Kullanıcı adına göre kullanıcı", description = "Kullanıcı adına göre kullanıcı bilgilerini getirir")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    @Operation(summary = "E-posta adresine göre kullanıcı", description = "E-posta adresine göre kullanıcı bilgilerini getirir")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/role/{role}")
    @Operation(summary = "Role göre kullanıcılar", description = "Belirli role sahip kullanıcıları listeler")
    public ResponseEntity<List<UserDto>> getUsersByRole(@PathVariable User.UserRole role) {
        List<UserDto> users = userService.getUsersByRole(role);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Duruma göre kullanıcılar", description = "Belirli durumdaki kullanıcıları listeler")
    public ResponseEntity<List<UserDto>> getUsersByStatus(@PathVariable User.UserStatus status) {
        List<UserDto> users = userService.getUsersByStatus(status);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Kullanıcı arama", description = "Anahtar kelimeye göre kullanıcı arama")
    public ResponseEntity<List<UserDto>> searchUsers(@RequestParam String keyword) {
        List<UserDto> users = userService.searchUsersByKeyword(keyword);
        return ResponseEntity.ok(users);
    }
    
    @PostMapping
    @Operation(summary = "Yeni kullanıcı oluştur", description = "Sisteme yeni kullanıcı ekler")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserRequest request) {
        try {
            User user = request.toUser();
            UserDto createdUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (RuntimeException e) {
            log.error("Kullanıcı oluşturma hatası: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Kullanıcı güncelle", description = "Mevcut kullanıcı bilgilerini günceller")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @Valid @RequestBody CreateUserRequest request) {
        try {
            User userDetails = request.toUser();
            UserDto updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            log.error("Kullanıcı güncelleme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Kullanıcı sil", description = "Kullanıcıyı sistemden kaldırır")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            log.error("Kullanıcı silme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Kullanıcı durumu değiştir", description = "Kullanıcının durumunu günceller")
    public ResponseEntity<Void> changeUserStatus(@PathVariable Long id, @RequestParam User.UserStatus status) {
        try {
            userService.changeUserStatus(id, status);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Kullanıcı durumu değiştirme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
} 