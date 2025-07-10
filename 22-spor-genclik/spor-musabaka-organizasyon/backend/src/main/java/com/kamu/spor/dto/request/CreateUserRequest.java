package com.kamu.spor.dto.request;

import com.kamu.spor.model.User;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateUserRequest {
    
    @NotBlank(message = "Kullanıcı adı boş olamaz")
    @Size(min = 3, max = 50, message = "Kullanıcı adı 3-50 karakter arasında olmalıdır")
    private String username;
    
    @NotBlank(message = "Şifre boş olamaz")
    @Size(min = 6, max = 100, message = "Şifre en az 6 karakter olmalıdır")
    private String password;
    
    @NotBlank(message = "E-posta adresi boş olamaz")
    @Email(message = "Geçerli bir e-posta adresi giriniz")
    private String email;
    
    @NotBlank(message = "Ad boş olamaz")
    @Size(max = 50, message = "Ad en fazla 50 karakter olabilir")
    private String firstName;
    
    @NotBlank(message = "Soyad boş olamaz")
    @Size(max = 50, message = "Soyad en fazla 50 karakter olabilir")
    private String lastName;
    
    @Pattern(regexp = "^[0-9]{10,11}$", message = "Geçerli bir telefon numarası giriniz")
    private String phoneNumber;
    
    @NotNull(message = "Rol seçilmelidir")
    private User.UserRole role;
    
    public User toUser() {
        User user = new User();
        user.setUsername(this.username);
        user.setPassword(this.password);
        user.setEmail(this.email);
        user.setFirstName(this.firstName);
        user.setLastName(this.lastName);
        user.setPhoneNumber(this.phoneNumber);
        user.setRole(this.role);
        return user;
    }
} 