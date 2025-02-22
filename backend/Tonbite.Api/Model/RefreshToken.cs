using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tonbite.Api.Model;

public class RefreshToken : IEntity
{
    /// <inheritdoc />
    [Key]
    public long Id { get; set; }
    
    /// <summary> Refresh Token. </summary>
    [Required(ErrorMessage = "Token is required.")]
    [MaxLength(512, ErrorMessage = "Token is too long.")]
    public required string Token { get; set; }

    [NotMapped]
    public long? UserId => Owner.Id;

    /// <summary> User token belongs to. </summary>
    [JsonIgnore]
    public User Owner { get; init; } = null!;
    
    /// <summary> Token Expire date. </summary>
    public DateTime Expires { get; set; }
}