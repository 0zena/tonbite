using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tonbite.Api.Model;

public class Course : CourseProps, IEntity
{
    /// <inheritdoc />
    [Key]
    public long Id { get; set; }
    
    /// <summary> List of course steps. </summary>
    public List<CourseStep>? Steps { get; set; }
    
    public List<UserCourse>? Users { get; set; }

    public void CopyFrom(CourseProps other)
    {
        Name = other.Name;
        Bio = other.Bio;
        WalletAddress = other.WalletAddress;
        Price = other.Price;
        Visibility = other.Visibility;
    }
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
    [MaxLength(1000, ErrorMessage = "Maximum length is {1}")]
    public required string Bio { get; set; }
    
    /// <summary> Wallet send transaction to. </summary>
    public string? WalletAddress { get; set; }

    /// <summary> Course purchase price. </summary>
    public double? Price { get; set; }
    
    /// <summary> DateTime when course was created. </summary>
    public DateTime Created { get; set; }
    
    /// <summary> Visibility of the course. </summary>
    public Visibility Visibility { get; set; }
}

public enum Visibility
{
    Private = 0,
    Public = 1
}
