using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Model;

namespace Tonbite.Api.Http.Services;

public class CourseStepHttpService(ApplicationDbContext context) : ICourseStepHttpService
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

    public Task<CourseStep?> Get(long id) 
        => context.CourseSteps
            .Include(x => x.Course)
            .Include(x => x.Course.Users)
            .FirstOrDefaultAsync(x => x.Id == id);
}