using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/course-steps")]
public class CourseStepController(ApplicationDbContext context, ICourseStepHttpService service) : ControllerBase
{
    [HttpGet]
    [Route("{id:long}")]
    public async Task<CourseStep?> Get([FromRoute] long id)
    {
        return await context.CourseSteps
            .Include(x => x.Course)
            .FirstOrDefaultAsync(x => x.Id == id);
    }
}