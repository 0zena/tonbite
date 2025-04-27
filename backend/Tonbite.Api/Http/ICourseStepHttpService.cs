using Tonbite.Api.Model;

namespace Tonbite.Api.Http;

public interface ICourseStepHttpService
{
    /// <summary> Creates new course step instance. </summary>
    /// <param name="props">Course props received from the client.</param>
    /// <param name="course">CourseStep parent Course.</param>
    /// <returns>New course step instance.</returns>
    CourseStep Create(CourseStepProps props, Course course);

    /// <summary> Gets course step. </summary>
    /// <param name="id">Primary Key of Course Step</param>
    /// <returns>Course step.</returns>
    Task<CourseStep?> Get(long id);
}