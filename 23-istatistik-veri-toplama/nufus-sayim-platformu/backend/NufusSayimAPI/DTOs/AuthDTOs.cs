using System.ComponentModel.DataAnnotations;

namespace NufusSayimAPI.DTOs;

public class LoginRequest
{
    [Required(ErrorMessage = "Kullanıcı adı gereklidir")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Şifre gereklidir")]
    public string Password { get; set; } = string.Empty;
}

public class RegisterRequest
{
    [Required(ErrorMessage = "Kullanıcı adı gereklidir")]
    [MinLength(3, ErrorMessage = "Kullanıcı adı en az 3 karakter olmalıdır")]
    [MaxLength(50, ErrorMessage = "Kullanıcı adı en fazla 50 karakter olabilir")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Şifre gereklidir")]
    [MinLength(6, ErrorMessage = "Şifre en az 6 karakter olmalıdır")]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "Rol gereklidir")]
    public string Role { get; set; } = "Gözlemci"; // Admin, Görevli, Gözlemci
}

public class AuthResponse
{
    public string Token { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
}

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public bool IsActive { get; set; }
} 