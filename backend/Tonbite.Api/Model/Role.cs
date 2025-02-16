using System.ComponentModel.DataAnnotations;

namespace Tonbite.Api.Model;

public class Role : RoleProps, IEntity
{
    /// <inheritdoc />
    [Key]
    public long Id { get; set; }
    
    /// <summary> User of the role </summary>
    public required User User { get; set; }
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