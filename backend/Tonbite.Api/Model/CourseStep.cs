using System.ComponentModel.DataAnnotations;

namespace Tonbite.Api.Model;

public class CourseStep : CourseStepProps, IEntity
{
    /// <inheritdoc />
    [Key]
    public long Id { get; set; }
    
    /// <summary> Course which course step belongs to. </summary>
    public required Course Course { get; set; }
}

public class CourseStepProps
{
    /// <summary> Course step name. </summary>
    [Required(ErrorMessage = "Course Name is required.")]
    [MaxLength(250, ErrorMessage = "Maximum length is {1}")]
    public required string Name { get; set; }
    
    /// <summary> Short course step description. </summary>
    [Required(ErrorMessage = "Course Description is required.")]
    [MaxLength(1000, ErrorMessage = "Maximum length is {1}")]
    public required string Bio { get; set; }
    
    /// <summary> Short course step description. </summary>
    [Required(ErrorMessage = "Course Description is required.")]
    [MaxLength(20000, ErrorMessage = "Maximum length is {1}")]
    public required string Content {get; set;}
    
    /// <summary> DateTime when course was created. </summary>
    public DateTime Created { get; set; }
}