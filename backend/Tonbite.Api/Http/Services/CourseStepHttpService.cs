using Tonbite.Api.Model;

namespace Tonbite.Api.Http.Services;

public class CourseStepHttpService : ICourseStepHttpService
{
    /// <inheritdoc /> 
    public CourseStep Create(CourseStepProps props, Course course) => new()
    {
        Name = props.Name,
        Bio = props.Bio,
        Content = props.Content,
        Created = DateTime.UtcNow,
        Course = course
    };
}