using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Identity;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[Authorize]
[ApiController]
[Route("/api/courses")]
public class CourseController(ApplicationDbContext context, ICourseHttpService service) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Course>> Create(
        [FromBody] CourseProps props,
        [FromServices] IUserHttpService userService)
    {
        if (!ModelState.IsValid)
            return BadRequest();
        
        var id = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user = await userService.GetUser(id);
        if (user == null)
            return NotFound();

        var course = service.Create(props, user);
        
        return await context.CreateAsync(course);
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok();
    }
    
    [HttpGet]
    [Route("{id:long}")]
    public async Task<Course?> Get([FromRoute] long id, [FromQuery] bool steps)
    {
        return await service.Get(id, steps);
    }

    [HttpPut]
    [Route("{id:long}")]
    [RequiresOneOfClaim(IdentityData.CreatorUserClaimName, "True", IdentityData.AdminUserClaimName, "True")]
    public async Task<ActionResult<Course>> Update(
        [FromRoute] long id, 
        [FromBody] Course form,
        [FromServices] IUserHttpService userService)
    {
        if (!ModelState.IsValid) return BadRequest();
        var course = await service.Get(id, false);
        if (course == null) return NotFound();
        course.CopyFrom(form);
        return Ok(await context.UpdateAsync(course));
    }

    [HttpDelete]
    [Route("{id:long}")]
    [RequiresOneOfClaim(IdentityData.CreatorUserClaimName, "True", IdentityData.AdminUserClaimName, "True")]
    public async Task<IActionResult> Delete([FromRoute] long id)
    {
        var course = context.Courses.FirstOrDefault(x => x.Id == id);
        
        if (course != null)
            await context.DeleteAsync(course);
        
        return Ok(course?.Id);
    }

    [HttpPost]
    [Route("{id:long}/purchase")]
    public async Task<ActionResult<object>> Purchase([FromRoute] long id, [FromServices] IUserHttpService userService)
    {
        var userId = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user =  await userService.GetUser(userId, false);
        var course = await service.Get(id, false);
        if (user == null || course == null) return NotFound();

        var userCourse = new UserCourse
        {
            User = user,
            Course = course,
            Status = UserCourseStatus.Purchased,
            CreatedAt = DateTime.UtcNow
        };
        
        return await context.CreateAsync(userCourse);
    }
}