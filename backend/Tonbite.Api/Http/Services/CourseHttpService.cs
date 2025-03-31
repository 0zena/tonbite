using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Model;

namespace Tonbite.Api.Http.Services;

public class CourseHttpService(ApplicationDbContext context) : ICourseHttpService
{
    /// <inheritdoc /> 
    public Course Create(CourseProps props, User user) => new()
    {
        Name = props.Name,
        Bio = props.Bio,
        WalletAddress = props.WalletAddress,
        Price = props.Price,
        Created = DateTime.UtcNow,
        Owner = user
    };

    public async Task<Course?> Get(long id, bool includeSteps)
    {
        var query = context.Courses
            .Include(x => x.Owner)
            .AsQueryable();

        if (includeSteps) query = query.Include(x => x.Steps);
        
        return await query.FirstOrDefaultAsync(x => x.Id == id);
    }
}