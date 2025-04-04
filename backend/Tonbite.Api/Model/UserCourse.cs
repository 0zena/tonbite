using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tonbite.Api.Model;

/// <summary>
/// Table for User and Course many-to-many relation
/// <see href="https://learn.microsoft.com/en-us/ef/core/modeling/relationships/many-to-many"/>
/// </summary>
public class UserCourse
{
    [ForeignKey("User")]
    public long UserId { get; set; }

    [JsonIgnore] public User User { get; set; } = null!;

    [ForeignKey("Course")]
    public long CourseId { get; set; }
    
    [JsonIgnore]
    public Course Course { get; set; } = null!;
    
    public UserCourseStatus? Status { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum UserCourseStatus
{
    Creator = 0,
    Purchased = 1
}