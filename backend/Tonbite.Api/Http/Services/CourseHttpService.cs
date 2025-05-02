using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Model;

namespace Tonbite.Api.Http.Services;

public class CourseHttpService(ApplicationDbContext context) : ICourseHttpService
{
    /// <inheritdoc /> 
    public Course Create(CourseProps props, User user)
    {
        var course = new Course
        {
            Name = props.Name,
            Bio = props.Bio,
            WalletAddress = props.WalletAddress,
            Price = props.Price,
            Created = DateTime.UtcNow,
        };
        
        var owner = new UserCourse
        {
            User = user,
            Course = course,
            CreatedAt = DateTime.UtcNow,
            Status = UserCourseStatus.Creator
        };

        course.Users ??= [];
        course.Users.Add(owner);
        
        return course;
    }

    /// <inheritdoc /> 
    public Task<Course?> Get(long id, bool includeSteps)
    {
        var query = context.Courses
            .Include(x => x.Users)
            .AsQueryable();

        if (includeSteps)
            query = query
                .Include(x => x.Steps!
                    .AsQueryable()
                    .OrderBy(y => y.Created)
                );
        
        return query.FirstOrDefaultAsync(x => x.Id == id);
    }
}