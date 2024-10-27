using System.ComponentModel.DataAnnotations;

namespace Tonbite.Api.Models;

public class User : UserProps
{
    /// <summary> List of the user roles </summary>
    public List<Role>? Roles { get; set; }
}

public class UserLogin
{
    [EmailAddress]
    [Required(ErrorMessage = "Email is required")]
    public required string Email { get; set; }
    
    [Required(ErrorMessage = "Password is required")]
    public required  string Password { get; set; }
}

public class UserRegister : UserProps
{
    /// <summary> Confirm password </summary>
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public required string ConfirmPassword { get; set; }
}

public class UserProps
{
    /// <summary> User unique identifier </summary>
    public int Id { get; set; }
    
    /// <summary> Username </summary>
    [Required(AllowEmptyStrings = false)]
    [MaxLength(12, ErrorMessage = "Username cannot be longer than 12 characters.")]
    public required string Username { get; set; }
    
    /// <summary> User unique email </summary>
    [EmailAddress]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Email is required")]
    [MaxLength(50, ErrorMessage = "Email cannot be longer than 50 characters.")]
    public required string Email { get; set; }
    
    /// <summary> User profile bio </summary>
    [MaxLength(1000, ErrorMessage = "Bio must be 1000 characters or fewer")]
    public string Bio { get; set; } = string.Empty;

    /// <summary> User password </summary>
    [DataType(DataType.Password)]
    [Required(AllowEmptyStrings = false, ErrorMessage = "Password is required")]
    public string Password { get; set; } = default!;
}