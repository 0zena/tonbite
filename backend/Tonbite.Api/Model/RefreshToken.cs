using System.ComponentModel.DataAnnotations;

namespace Tonbite.Api.Model;

public class RefreshToken : IEntity
{
    /// <inheritdoc />
    public int Id { get; set; }
    
    /// <summary> Refresh Token. </summary>
    [Required(ErrorMessage = "Token is required.")]
    [MaxLength(512, ErrorMessage = "Token is too long.")]
    public required string Token { get; set; }
    
    /// <summary> User token belongs to. </summary>
    public required User User { get; set; }
    
    /// <summary> Token Expire date. </summary>
    public DateTime Expires { get; set; }
    
    /// <summary> Revoke status. </summary>
    public bool IsRevoked { get; set; }
}