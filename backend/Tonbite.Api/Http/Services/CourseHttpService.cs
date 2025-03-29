using Tonbite.Api.Model;

namespace Tonbite.Api.Http.Services;

public class CourseHttpService : ICourseHttpService
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
}