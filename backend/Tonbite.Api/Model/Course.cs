namespace Tonbite.Api.Model;

public class Course : CourseProps, IEntity
{
    /// <inheritdoc />
    public int Id { get; set; }
}

/// <summary>
/// Properties that might be used when creating new course. 
/// </summary>
public class CourseProps
{
    /// <summary> Course name. </summary>
    public required string Name { get; set; }
    
    /// <summary> Short course description. </summary>
    public required string Bio { get; set; }
    
    /// <summary> Wallet send transaction to. </summary>
    public string? WalletAddress { get; set; }
    
    /// <summary> Course purchase price. </summary>
    public double? Price { get; set; }
    
    /// <summary> DateTime when course was created. </summary>
    public DateTime Created { get; set; }
    
    /// <summary> Course owner. </summary>
    public required User Owner { get; set; }
}
