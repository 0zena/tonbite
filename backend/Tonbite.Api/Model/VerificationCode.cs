using System.ComponentModel.DataAnnotations;

namespace Tonbite.Api.Model;

public class VerificationCode : IEntity
{
    [Key]
    public long Id { get; set; }

    [Required]
    [EmailAddress]
    [MaxLength(254, ErrorMessage = "Email cannot be longer than 254 characters.")]
    public string Email { get; set; } = null!;

    [Required]
    [MaxLength(5)]
    public string Code { get; set; } = null!;

    public DateTime Created { get; set; }

    public DateTime Expires { get; set; }
}