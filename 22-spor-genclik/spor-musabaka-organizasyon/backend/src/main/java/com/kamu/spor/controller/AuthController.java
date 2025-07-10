package com.kamu.spor.controller;

import com.kamu.spor.dto.UserDto;
import com.kamu.spor.dto.request.LoginRequest;
import com.kamu.spor.dto.request.RegisterRequest;
import com.kamu.spor.dto.response.AuthResponse;
import com.kamu.spor.model.User;
import com.kamu.spor.service.AuthService;
import com.kamu.spor.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Kimlik Doğrulama", description = "Giriş, kayıt ve token işlemleri için API endpoint'leri")
public class AuthController {
    
    private final AuthService authService;
    private final UserService userService;
    
    @PostMapping("/login")
    @Operation(summary = "Kullanıcı girişi", description = "Kullanıcı adı ve şifre ile giriş yapar")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request.getUsername(), request.getPassword());
            log.info("Kullanıcı girişi başarılı: {}", request.getUsername());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Giriş hatası: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, null, "Kullanıcı adı veya şifre hatalı", null, null));
        }
    }
    
    @PostMapping("/register")
    @Operation(summary = "Kullanıcı kaydı", description = "Yeni kullanıcı kaydı oluşturur")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(request.getPassword());
            user.setEmail(request.getEmail());
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setPhoneNumber(request.getPhoneNumber());
            user.setRole(User.UserRole.ATHLETE); // Varsayılan rol
            
            UserDto createdUser = userService.createUser(user);
            AuthResponse response = authService.login(request.getUsername(), request.getPassword());
            
            log.info("Yeni kullanıcı kaydı başarılı: {}", request.getUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("Kayıt hatası: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, null, e.getMessage(), null, null));
        }
    }
    
    @PostMapping("/refresh")
    @Operation(summary = "Token yenileme", description = "Mevcut token ile yeni token alır")
    public ResponseEntity<AuthResponse> refreshToken(@RequestParam String refreshToken) {
        try {
            AuthResponse response = authService.refreshToken(refreshToken);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Token yenileme hatası: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, null, "Geçersiz token", null, null));
        }
    }
    
    @PostMapping("/logout")
    @Operation(summary = "Çıkış yap", description = "Kullanıcı çıkışı yapar")
    public ResponseEntity<Void> logout(@RequestParam String refreshToken) {
        try {
            authService.logout(refreshToken);
            log.info("Kullanıcı çıkışı başarılı");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Çıkış hatası: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/me")
    @Operation(summary = "Kullanıcı bilgileri", description = "Giriş yapmış kullanıcının bilgilerini getirir")
    public ResponseEntity<UserDto> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            String username = authService.getUsernameFromToken(token.replace("Bearer ", ""));
            UserDto user = userService.getUserByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Kullanıcı bilgileri alma hatası: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
} 