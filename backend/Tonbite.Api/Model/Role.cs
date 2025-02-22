using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tonbite.Api.Model;

public class Role : RoleProps, IEntity
{
    /// <inheritdoc />
    [Key]
    public long Id { get; set; }

    [NotMapped] 
    public long? UserId => Owner.Id;
    
    /// <summary> User of the role </summary>
    [JsonIgnore]
    public User Owner { get; init; } = null!;
}

/// <summary>
/// Properties that might be used to send back to the client.
/// </summary>
public class RoleProps
{
    /// <summary> Name of the user role </summary>
    public required string Name { get; set; }
}

/// <summary>
/// All Roles.
/// </summary>
public enum Roles
{
    /// <summary> Represents default user. </summary>
    Default = 0,
    
    /// <summary> Represents creator. </summary>
    Creator = 1,

    /// <summary> Represents administrator. </summary>
    Admin = 2
}