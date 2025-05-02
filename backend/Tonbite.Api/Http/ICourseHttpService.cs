using Tonbite.Api.Model;

namespace Tonbite.Api.Http;

public interface ICourseHttpService
{
    /// <summary> Creates new course instance. </summary>
    /// <param name="props">Course props received from the client.</param>
    /// <param name="user">Course owner.</param>
    /// <returns>New course instance.</returns>
    Course Create(CourseProps props, User user);

    /// <summary> Gets Course. </summary>
    /// <param name="id">Search key.</param>
    /// <param name="includeSteps">Include Steps or not.</param>
    /// <returns>Course.</returns>
    Task<Course?> Get(long id, bool includeSteps);
}