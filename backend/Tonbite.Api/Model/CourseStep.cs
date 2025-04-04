using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tonbite.Api.Model;

public class CourseStep : CourseStepProps, IEntity
{
    /// <inheritdoc />
    [Key]
    public long Id { get; set; }

    [NotMapped]
    public override long ParentId => Course.Id;

    /// <summary> Course which course step belongs to. </summary>
    [JsonIgnore]
    public Course Course { get; set; } = null!;
}

public class CourseStepProps
{
    [NotMapped]
    public virtual long ParentId { get; set; }
    
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
    public required string Content {get; set; }
    
    /// <summary> DateTime when course was created. </summary>
    public DateTime Created { get; set; }
}