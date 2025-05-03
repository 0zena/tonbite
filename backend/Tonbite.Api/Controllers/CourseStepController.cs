using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Identity;
using Tonbite.Api.Model;
using Tonbite.Api.Model.Utils;

namespace Tonbite.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/course-steps")]
public class CourseStepController(ApplicationDbContext context, ICourseStepHttpService service) : ControllerBase
{
    [HttpGet]
    [Route("{id:long}")]
    public async Task<ActionResult<CourseStep?>> Get([FromRoute] long id, [FromServices] IUserHttpService userService)
    {
        var userId = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user =  await userService.GetUser(userId);
        
        var step = await service.Get(id);
        var course = step?.Course;

        return course?.Users?.FirstOrDefault(x => x.User == user) != null || user.IsAdmin() ? step : NotFound();
    }

    [HttpPost]
    public async Task<ActionResult<CourseStep>> Create([FromBody] CourseStepProps props)
    {
        var course = await context.Courses.FirstOrDefaultAsync(x => x.Id == props.ParentId);
        if (course == null) return BadRequest();
        return await context.CreateAsync(service.Create(props, course));
    }

    [HttpPut]
    [Route("{id:long}")]
    [RequiresOneOfClaim(IdentityData.CreatorUserClaimName, "True", IdentityData.AdminUserClaimName, "True")]
    public async Task<ActionResult<CourseStep>> Update([FromRoute] long id, [FromBody] CourseStepProps props)
    {
        var step = await service.Get(id);
        if (step == null) return BadRequest();
        step?.CopyFrom(props);
        return await context.UpdateAsync(step);
    }

    [HttpDelete]
    [Route("{id:long}")]
    [RequiresOneOfClaim(IdentityData.CreatorUserClaimName, "True", IdentityData.AdminUserClaimName, "True")]
    public async Task<ActionResult<long?>> Delete([FromRoute] long id)
    {
        var step = context.CourseSteps.FirstOrDefault(x => x.Id == id);
        if (step != null)
            await context.DeleteAsync(step);
        
        return step?.Id;
    }
}