using System.ComponentModel.DataAnnotations;

namespace Tonbite.Api.Model;

public class Course : CourseProps, IEntity
{
    /// <inheritdoc />
    [Key]
    public long Id { get; set; }
    
    /// <summary> Course owner. </summary>
    public required User Owner { get; set; }
}

/// <summary>
/// Properties that might be used when creating new course. 
/// </summary>
public class CourseProps
{
    /// <summary> Course name. </summary>
    [Required(ErrorMessage = "Course Name is required.")]
    [MaxLength(250, ErrorMessage = "Maximum length is {1}")]
    public required string Name { get; set; }
    
    /// <summary> Short course description. </summary>
    [Required(ErrorMessage = "Course Description is required.")]
    [MaxLength(10000, ErrorMessage = "Maximum length is {1}")]
    public required string Bio { get; set; }
    
    /// <summary> Wallet send transaction to. </summary>
    public string? WalletAddress { get; set; }
    
    /// <summary> Course purchase price. </summary>
    public double? Price { get; set; }
    
    /// <summary> DateTime when course was created. </summary>
    public DateTime Created { get; set; }
}
