using System.ComponentModel.DataAnnotations;

namespace Tonbite.Api.Models;

public class User : UserProps
{
    /// <summary> User password </summary>
    [DataType(DataType.Password)]
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; } = null!;
}

public class UserProps : IEntity
{
    /// <summary> Unique User identifier </summary>
    public int Id { get; set; }

    /// <summary> Username </summary>
    [MaxLength(12, ErrorMessage = "Username cannot be longer than 12 characters.")]
    public string? Username { get; set; }
    
    /// <summary> User unique email </summary>
    [EmailAddress]
    [Required(ErrorMessage = "Email is required")]
    [MaxLength(254, ErrorMessage = "Email cannot be longer than 254 characters.")]
    public required string Email { get; set; }
    
    /// <summary> User profile bio </summary>
    [MaxLength(1000, ErrorMessage = "Bio must be 1000 characters or fewer")]
    public string? Bio { get; set; }
    
    /// <summary> List of the user roles </summary>
    public List<Role>? Roles { get; set; }
}

public class UserLogin
{
    /// <summary> User unique email </summary>
    [EmailAddress]
    [Required(ErrorMessage = "Email is required")]
    [MaxLength(254, ErrorMessage = "Email cannot be longer than 254 characters.")]
    public required string Email { get; set; }

    /// <summary> User password </summary>
    [DataType(DataType.Password)]
    public string Password { get; set; } = null!;
}

public class UserRegister : UserLogin
{
    /// <summary> Confirm password </summary>
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; } = null!;
}

public class PasswordReset
{
    /// <summary> User password </summary>
    [DataType(DataType.Password)]
    [Required(ErrorMessage = "Old Password is required.")]
    public string Password { get; set; } = null!;
    
    /// <summary> User password </summary>
    [DataType(DataType.Password)]
    [Required(ErrorMessage = "New Password is required.")]
    public string NewPassword { get; set; } = null!;
    
    /// <summary> Confirm password </summary>
    [DataType(DataType.Password)]
    [Compare("NewPassword", ErrorMessage = "The old password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; } = null!;
}
