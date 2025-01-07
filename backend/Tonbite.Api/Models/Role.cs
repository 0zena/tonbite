namespace Tonbite.Api.Models;

public class Role : RoleProps, IEntity
{
    /// <summary> Unique Role identifier </summary>
    public int Id { get; set; }
    
    /// <summary> User of the role </summary>
    public required User User { get; set; }
}

public class RoleProps
{
    /// <summary> Name of the user role </summary>
    public required string Name { get; set; }
}