namespace Tonbite.Api.Models;

public class Role : RoleProps { }

public class RoleProps
{
    /// <summary> Role unique identifier </summary>
    public int Id { get; set; }
    
    /// <summary> Name of the user role </summary>
    public required string Name { get; set; }
    
    /// <summary> Roles user </summary>
    public required User User { get; set; }
}