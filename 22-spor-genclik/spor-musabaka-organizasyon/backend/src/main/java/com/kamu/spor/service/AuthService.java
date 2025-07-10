package com.kamu.spor.service;

import com.kamu.spor.dto.response.AuthResponse;
import com.kamu.spor.model.User;
import com.kamu.spor.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private Long jwtExpiration;
    
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
    
    public AuthResponse login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Hatalı şifre");
        }
        
        if (user.getStatus() != User.UserStatus.ACTIVE) {
            throw new RuntimeException("Kullanıcı aktif değil");
        }
        
        String accessToken = generateAccessToken(user);
        String refreshToken = generateRefreshToken(user);
        
        return new AuthResponse(
                accessToken,
                refreshToken,
                "Giriş başarılı",
                user.getUsername(),
                user.getRole().toString()
        );
    }
    
    public AuthResponse refreshToken(String refreshToken) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(refreshToken)
                    .getBody();
            
            String username = claims.getSubject();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
            
            String newAccessToken = generateAccessToken(user);
            String newRefreshToken = generateRefreshToken(user);
            
            return new AuthResponse(
                    newAccessToken,
                    newRefreshToken,
                    "Token yenilendi",
                    user.getUsername(),
                    user.getRole().toString()
            );
        } catch (JwtException e) {
            throw new RuntimeException("Geçersiz refresh token");
        }
    }
    
    public void logout(String refreshToken) {
        // Burada refresh token'ı blacklist'e eklenebilir
        log.info("Kullanıcı çıkışı yapıldı");
    }
    
    public String getUsernameFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            
            return claims.getSubject();
        } catch (JwtException e) {
            throw new RuntimeException("Geçersiz token");
        }
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
    
    private String generateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().toString());
        claims.put("userId", user.getId());
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    private String generateRefreshToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (jwtExpiration * 7))) // 7 gün
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
} 