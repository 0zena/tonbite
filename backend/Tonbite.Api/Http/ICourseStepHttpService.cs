using Tonbite.Api.Model;

namespace Tonbite.Api.Http;

public interface ICourseStepHttpService
{
    /// <summary> Creates new course instance. </summary>
    /// <param name="props">Course props received from the client.</param>
    /// <param name="course">CourseStep parent Course.</param>
    /// <returns>New course instance.</returns>
    CourseStep Create(CourseStepProps props, Course course);
}